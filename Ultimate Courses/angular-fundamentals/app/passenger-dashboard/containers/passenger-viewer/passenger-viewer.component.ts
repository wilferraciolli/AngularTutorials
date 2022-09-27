import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';
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

  constructor(private passengerService: PassengerDashboardService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    // print out to see what values are on the path as params
    // this.route.params
    //     .subscribe((data: Params) => {
    //       console.log('Printing the values on the router params ', data);
    //     });

    this.route.params
        .switchMap((data: Passenger) => this.passengerService.getPassenger(data.id))
        .subscribe((data: Passenger) => this.passenger = data);
  }

  public onUpdatePassenger(event: Passenger) {
    console.log('Received output from child ', event);
    this.passengerService.updatePassenger(event)
        .subscribe((data: Passenger) => {
          this.passenger = Object.assign({}, this.passenger, data);
        });
  }
}
