import { Component, Input, OnInit } from '@angular/core';
import { Passenger } from '../../models/passenger.interface';
import { PassengerDashboardService } from '../../passenger-dashboar.service';

@Component({
  selector: 'passenger-form',
  styleUrls: ['passenger-form.component.scss'],
  template: `
    <div>
      <form>
        Form!
        <div>
          {{ detail | json }}
        </div>
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

}
