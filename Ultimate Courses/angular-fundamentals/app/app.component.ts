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
            [class.checked-in]="passenger.checkedIn"></span>
          {{i}}: {{ passenger.fullname }}
          <p>{{ passenger | json }}</p>
          <div class="date">
            Check-in date:  {{
            passenger.checkInDate ?
              (passenger.checkInDate | date: 'yMMMd' | uppercase) :
              ('Not checked-in' | uppercase)
            }}
          </div>
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
      checkedIn: true,
      checkInDate: 1490742000000
    },
    {
      id: 2,
      fullname: 'Rose',
      checkedIn: false,
      checkInDate: null
    },
    {
      id: 3,
      fullname: 'James',
      checkedIn: true,
      checkInDate: 1490742000000
    },
    {
      id: 4,
      fullname: 'Louise',
      checkedIn: true,
      checkInDate: 1490742000000
    },
    {
      id: 5,
      fullname: 'Tina',
      checkedIn: false,
      checkInDate: 1490742000000
    }

  ];

}
