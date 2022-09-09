import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div class="app">

      <h3>Airline passengers</h3>
    
      <ul>
        <li *ngFor="let passenger of passengers; let i = index">
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
    }

  ];

}
