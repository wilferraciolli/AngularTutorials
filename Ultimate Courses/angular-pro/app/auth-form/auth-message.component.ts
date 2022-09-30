import { Component, Output, EventEmitter } from '@angular/core';

import { User } from './auth-form.interface';

@Component({
  selector: 'auth-message',
  template: `
    <div>
      You will ge logged in for {{ days }} days
    </div>
  `
})
export class AuthMessageComponent {
  days: number = 7;
}
