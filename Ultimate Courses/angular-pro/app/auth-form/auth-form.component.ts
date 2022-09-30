import {
  Component,
  Output,
  EventEmitter,
  AfterContentInit,
  ContentChild,
  ContentChildren,
  QueryList
} from '@angular/core';

import { User } from './auth-form.interface';
import { AuthRememberComponent } from './auth-remember';

@Component({
  selector: 'auth-form',
  template: `
    <div>
      <form (ngSubmit)="onSubmit(form.value)"
            #form="ngForm">
        <!-- Create ngContent to allow content to be passed when creating the component, by default it will take everything between the tag and propject here -->
        <ng-content select="h3"></ng-content>
        <label>
          Email address
          <input type="email"
                 name="email"
                 ngModel>
        </label>
        <label>
          Password
          <input type="password"
                 name="password"
                 ngModel>
        </label>

        <!-- Grab the Remember me component -->
        <ng-content select="auth-remember"></ng-content>

        <div *ngIf="showMessage">
          You will be logged in for 30 days
        </div>

        <!-- Grab the button tag that was passed onto this component -->
        <ng-content select="button"></ng-content>

      </form>
    </div>
  `
})
export class AuthFormComponent implements AfterContentInit {

  showMessage: boolean;

  @ContentChildren(AuthRememberComponent)
  remember: QueryList<AuthRememberComponent>;

  @Output()
  submitted: EventEmitter<User> = new EventEmitter<User>();

  public ngAfterContentInit(): void {
    if (this.remember) {
      console.log(this.remember);
      this.remember.forEach((item) => {
        item.checked.subscribe((checked: boolean) => this.showMessage = checked);
      });
    }
  }

  onSubmit(value: User) {
    this.submitted.emit(value);
  }
}
