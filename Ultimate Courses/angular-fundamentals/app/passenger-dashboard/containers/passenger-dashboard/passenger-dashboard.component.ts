import { Component, OnInit } from '@angular/core';
import { Passenger } from '../../models/passenger.interface';


@Component({
  selector: 'passenger-dashboard',
  styleUrls: ['passenger-dashboard.component.scss'],
  template: `
    <div>
      <passenger-count
        [items]="passengers">
      </passenger-count>

      <passenger-detail>

      </passenger-detail>


      <ul>
        <li *ngFor="let passenger of passengers; let i = index">
          <span
            class="status"
            [ngClass]="{
              'checked-in': passenger.checkedIn,
              'checked-out': !passenger.checkedIn
            }"></span>
          {{i}}: {{ passenger.fullname }}
          <!--        <p>{{ passenger | json }}</p>-->
          <div class="date">
            Check-in date:  {{
            passenger.checkInDate ?
              (passenger.checkInDate | date: 'yMMMd' | uppercase) :
              ('Not checked-in' | uppercase)
            }}
            <div class="children">
              <!-- safe navigation to only evaluate expression if preconditions are not null-->
              Number of children: {{ passenger.children?.length || 0 }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  `
})
export class PassengerDashboardComponent implements OnInit {
  passengers: Passenger[];

  constructor() {
  }

  public ngOnInit() {
    console.log('ngOnInit passenger component');
    this.passengers = [
      {
        id: 1,
        fullname: 'Steve',
        checkedIn: true,
        checkInDate: 1490742000000,
        children: null
      },
      {
        id: 2,
        fullname: 'Rose',
        checkedIn: false,
        checkInDate: null,
        children: [{ name: 'Ted', age: 12 }, { name: 'Chloe', age: 7 }]
      },
      {
        id: 3,
        fullname: 'James',
        checkedIn: true,
        checkInDate: 1490742000000,
        children: null
      },
      {
        id: 4,
        fullname: 'Louise',
        checkedIn: true,
        checkInDate: 1490742000000,
        children: [{ name: 'Jessica', age: 1 }]
      },
      {
        id: 5,
        fullname: 'Tina',
        checkedIn: false,
        checkInDate: 1490742000000,
        children: null
      }
    ];
  }

}
