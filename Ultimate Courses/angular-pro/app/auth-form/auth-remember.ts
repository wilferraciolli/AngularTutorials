import { Component, Output, EventEmitter } from '@angular/core';

import { User } from './auth-form.interface';

@Component({
  selector: 'auth-remember',
  template: `
    <label>
      <input type="checkbox"
             (change)="onChecked($event.target.checked)">
      Keep me logged in
    </label>
  `
})
export class AuthRememberComponent {

  @Output()
  checked: EventEmitter<boolean> = new EventEmitter<boolean>();

  public onChecked(value: boolean): void {
    this.checked.emit(value);
  }
}
