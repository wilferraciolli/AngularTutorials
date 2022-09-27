import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Passenger } from '../../models/passenger.interface';
import { PassengerDashboardService } from '../../passenger-dashboar.service';


@Component({
  selector: 'passenger-dashboard',
  styleUrls: ['passenger-dashboard.component.scss'],
  template: `
    <div>
      <passenger-count
        [items]="passengers">
      </passenger-count>

      <!--      <div *ngFor="let passenger of passengers;">-->
      <!--        {{ passenger.fullname }}-->
      <!--      </div>-->

      <passenger-detail
        *ngFor="let passenger of passengers;"
        [detail]="passenger"
        (view)="handleView($event)"
        (edit)="handleEdit($event)"
        (remove)="handleRemove($event)">
      </passenger-detail>
    </div>
  `
})
export class PassengerDashboardComponent implements OnInit {
  passengers: Passenger[];

  constructor(private passengerService: PassengerDashboardService,
              private router: Router) {
  }

  public ngOnInit() {
    console.log('ngOnInit passenger component');
    this.passengerService.getPassengers()
        .subscribe((data: Passenger[]) => this.passengers = data);
  }

  public handleView(event: Passenger) {
    this.router.navigate(['/passengers', event.id]);
  }

  public handleEdit(event: Passenger): void {
    // console.log('handling event and updating ', event);
    this.passengerService.updatePassenger(event)
        .subscribe((data: Passenger) => {
          this.passengers = this.passengers.map((passenger: Passenger) => {
            // if passenger is the one updated, then update its value
            if (passenger.id === event.id) {
              passenger = Object.assign({}, passenger, event);
            }

            return passenger;
          });
        });
    // console.log('list of passengers after updated ', this.passengers);
  }

  public handleRemove(event: Passenger): void {
    //  console.log('handling event and removing ', event);

    this.passengerService.removePassenger(event)
        .subscribe((data: Passenger) => {
          this.passengers = this.passengers.filter((passenger: Passenger) =>
            passenger.id !== event.id);
        });
  }


}
