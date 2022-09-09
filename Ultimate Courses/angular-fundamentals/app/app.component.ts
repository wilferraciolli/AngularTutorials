import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div class="app">

      <!-- Adding classes based on property binding-->
      <h3>Airline passengers</h3>
      <ul>
        <li *ngFor="let passenger of passengers; let i = index">
          <span
            class="status"
            [class.checked-in]="passenger.checkedIn">   </span>
          {{i}}: {{passenger.fullname}}
        </li>
      </ul>

      <!-- Adding classes based on ngClass binding-->
      <h3>Airline passengers</h3>
      <ul>
        <li *ngFor="let passenger of passengers; let i = index">
          <span
            class="status"
            [ngClass]="{
              'checked-in': passenger.checkedIn,
              'checked-out': !passenger.checkedIn
            }">  </span>
          {{i}}: {{passenger.fullname}}
        </li>
      </ul>

      <!-- Adding classes based on styles property binding-->
      <h3>Airline passengers</h3>
      <ul>
        <li *ngFor="let passenger of passengers; let i = index">
          <span
            class="status"
            [style.backgroundColor]="(passenger.checkedIn ? '#2ecc71' : '#c0392b')"
          >  </span>
          {{i}}: {{passenger.fullname}}
        </li>
      </ul>

      <!-- Adding classes based on ngStyle property binding-->
      <h3>Airline passengers</h3>
      <ul>
        <li *ngFor="let passenger of passengers; let i = index">
          <span
            class="status"
            [ngStyle]="{backgroundColor: (passenger.checkedIn ? '#2ecc71' : '#c0392b')}"
          >  </span>
          {{i}}: {{passenger.fullname}}
        </li>
      </ul>


    </div>
  `
})
export class AppComponent {
  name: string = '';

  passengers: Passenger[] = [
    {
      id: 1,
      fullname: 'Steve',
      checkedIn: true
    },
    {
      id: 2,
      fullname: 'Rose',
      checkedIn: false
    },
    {
      id: 3,
      fullname: 'James',
      checkedIn: true
    },
    {
      id: 4,
      fullname: 'Louise',
      checkedIn: true
    },
    {
      id: 5,
      fullname: 'Tina',
      checkedIn: false
    }

  ];

}
