import { Component, Input } from '@angular/core';
import { UiUserDetails } from './user-details.interface';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  @Input() user?: UiUserDetails;

  @Input() notificationCount: number = 0;
}
