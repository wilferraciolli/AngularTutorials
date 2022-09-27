import { Component, Input, OnInit } from '@angular/core';
import { Baggage } from '../../models/baggage.interface';
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
            required
            #id="ngModel"
            [ngModel]="detail?.id"
          >
          <div *ngIf="id.errors?.required && id.touched" class="error">
            ID is required
          </div>
        </div>

        <!-- name -->
        <div>
          Passenger name:
          <input
            type="text"
            name="fullname"
            required
            #fullname="ngModel"
            [ngModel]="detail?.fullname"
          >
          <div *ngIf="fullname.errors?.required && fullname.dirty" class="error">
            Passenger name is required
          </div>
        </div>

        <!-- checked in, toggle event when toggle True or False -->
        <div>
          <label>
            <input type="checkbox"
                   name="checkedIn"
                   [ngModel]="detail?.checkedIn"
                   (ngModelChange)="toggleCheckIn($event)">
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

        <!-- luggage, used twice to show the power of ngValue -->
        <div>
          Luggage:
          <select name="baggage"
                  [ngModel]="detail?.baggage">
            <option
              *ngFor="let item of baggage"
              [value]="item.key"
              [selected]="item.key === detail?.baggage">
              {{ item.value }}
            </option>
          </select>
        </div>

        <!-- Form state -->
        <div> {{ form.value | json }}</div>
        <div> Valid: {{ form.valid | json }}</div>
        <div> Invalid: {{ form.invalid | json }} </div>
      </form>
    </div>
  `
})
export class PassengerFormComponent implements OnInit {
  @Input()
  detail: Passenger;

  baggage: Baggage[] = [
    {
      key: 'none',
      value: 'No baggage'
    },
    {
      key: 'hand-only',
      value: 'Hand baggage'
    },
    {
      key: 'hold-only',
      value: 'Hold baggage'
    },
    {
      key: 'hand-hold',
      value: 'Hand and hold baggage'
    }

  ];

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
