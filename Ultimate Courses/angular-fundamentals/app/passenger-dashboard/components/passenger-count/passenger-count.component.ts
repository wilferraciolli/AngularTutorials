import { Component, Input, OnInit } from '@angular/core';
import { Passenger } from '../../models/passenger.interface';

@Component({
  selector: 'passenger-count',
  styleUrls: ['passenger-count.component.scss'],
  template: `
    <div>
      <h3>Airline passengers!</h3>
      <div>
        Total passengers: {{ items?.length }}
        Total checked in: {{ checkedInCount() }}
      </div>
    </div>
  `
})
export class PassengerCountComponent implements OnInit {
  @Input()
  items: Passenger[];

  constructor() {
  }

  public ngOnInit() {
  }

  checkedInCount() {
    if (!this.items) {
      return;
    }

    return this.items.filter((passenger: Passenger) =>
      passenger.checkedIn).length;
  }
}
