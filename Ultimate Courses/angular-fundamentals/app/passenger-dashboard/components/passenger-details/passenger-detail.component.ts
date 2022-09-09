import { Component, Input, OnInit } from '@angular/core';
import { Passenger } from '../../models/passenger.interface';

@Component({
  selector: 'passenger-detail',
  styleUrls: ['passenger-detail.component.scss'],
  template: `
    <div>
      <span
        class="status"
        [ngClass]="{
              'checked-in': detail.checkedIn,
              'checked-out': !detail.checkedIn
            }"></span>
      {{ detail.fullname }}
      <!--        <p>{{ passenger | json }}</p>-->
      <div class="date">
        Check-in date:  {{
        detail.checkInDate ?
          (detail.checkInDate | date: 'yMMMd') :
          ('Not checked-in' | uppercase)
        }}
        <div class="children">
          <!-- safe navigation to only evaluate expression if preconditions are not null-->
          Number of children: {{ detail.children?.length || 0 }}
        </div>
      </div>
    </div>
  `
})
export class PassengerDetailComponent implements OnInit {
  @Input()
  detail: Passenger;

  constructor() {
  }

  public ngOnInit() {
  }
}
