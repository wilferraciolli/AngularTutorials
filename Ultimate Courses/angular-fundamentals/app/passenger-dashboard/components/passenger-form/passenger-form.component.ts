import { Component, Input, OnInit } from '@angular/core';
import { Passenger } from '../../models/passenger.interface';
import { PassengerDashboardService } from '../../passenger-dashboar.service';

@Component({
  selector: 'passenger-form',
  styleUrls: ['passenger-form.component.scss'],
  template: `
    <div>
      <form #form="ngForm"
            novalidate>
        {{ detail | json }}

        <!-- id -->
        <div>
          Passenger Id:
          <input
            type="number"
            name="id"
            [ngModel]="detail?.id"
          >
        </div>

        <!-- name -->
        <div>
          Passenger name:
          <input
            type="text"
            name="fullname"
            [ngModel]="detail?.fullname"
          >
        </div>

        <!-- checked in, toggle event when toggle True or False -->
        <div>
          <label>
            <input type="radio"
                   [value]="true"
                   name="checkedIn"
                   [ngModel]="detail?.checkedIn"
                   (ngModelChange)="toggleCheckIn($event)">
            Yes
          </label>
          <label>
            <input type="radio"
                   [value]="false"
                   name="checkedIn"
                   [ngModel]="detail?.checkedIn"
                   (ngModelChange)="toggleCheckIn($event)">
            No
          </label>
        </div>

        <!-- checked in date time -->
        <div *ngIf="form.value.checkedIn">
          Check in date:
          <input type="number"
                 name="checkInDate"
                 [ngModel]="detail?.checkInDate"
          >

        </div>

        {{ form.value | json }}
      </form>
    </div>
  `
})
export class PassengerFormComponent implements OnInit {
  @Input()
  detail: Passenger;

  constructor(private passengerService: PassengerDashboardService) {
  }

  ngOnInit() {

  }

  public toggleCheckIn(checkedIn: boolean) {
    if (checkedIn) {
      this.detail.checkInDate = Date.now();
    }
  }
}
