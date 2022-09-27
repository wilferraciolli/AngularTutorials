import { Component, OnInit } from '@angular/core';
import { Passenger } from '../../models/passenger.interface';
import { PassengerDashboardService } from '../../passenger-dashboar.service';


@Component({
  selector: 'passenger-viewer',
  styleUrls: ['passenger-viewer.component.scss'],
  template: `
    <div>
      <passenger-form
        [detail]="passenger"
        (update)="onUpdatePassenger($event)">
      </passenger-form>
    </div>
  `
})
export class PassengerViewerComponent implements OnInit {
  passenger: Passenger;

  constructor(private passengerService: PassengerDashboardService) {
  }

  ngOnInit() {
    this.passengerService.getPassenger(1)
        .subscribe((data: Passenger) => this.passenger = data);
  }

  public onUpdatePassenger(event: Passenger) {
    console.log('Received output from child ', event);
    this.passengerService.updatePassenger(event)
        .subscribe((data: Passenger) => {
          this.passenger = Object.assign({}, this.passenger, event);
        });
  }
}
