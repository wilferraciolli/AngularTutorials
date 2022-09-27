import { Component, OnInit } from '@angular/core';
import { Passenger } from '../../models/passenger.interface';
import { PassengerDashboardService } from '../../passenger-dashboar.service';


@Component({
  selector: 'passenger-viewer',
  styleUrls: ['passenger-viewer.component.scss'],
  template: `
    <div>
      <passenger-form
        [detail]="passenger">
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

}
