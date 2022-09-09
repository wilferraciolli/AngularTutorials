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

      <passenger-detail
        *ngFor="let passenger of passengers;"
        [detail]="passenger"
        (edit)="handleEdit($event)"
        (remove)="handleRemove($event)">
      </passenger-detail>
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
        checkInDate: 1490142000000,
        children: null
      },
      {
        id: 4,
        fullname: 'Louise',
        checkedIn: true,
        checkInDate: 1490342000000,
        children: [{ name: 'Jessica', age: 1 }]
      },
      {
        id: 5,
        fullname: 'Tina',
        checkedIn: false,
        checkInDate: 1490542000000,
        children: null
      }
    ];
  }

  public handleEdit(event: Passenger): void {
    console.log('handling event and updating ', event);

    this.passengers = this.passengers.map((passenger: Passenger) => {
      // if passenger is the one updated, then update its value
      if (passenger.id === event.id) {
        passenger = Object.assign({}, passenger, event);
      }

      return passenger;
    });

    console.log('list of passengers after updated ', this.passengers);
  }

  public handleRemove(event: Passenger): void {
    console.log('handling event and removing ', event);

    this.passengers = this.passengers.filter((passenger: Passenger) =>
      passenger.id !== event.id);

  }
}
