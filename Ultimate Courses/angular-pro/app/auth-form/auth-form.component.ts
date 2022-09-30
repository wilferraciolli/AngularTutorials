import {
  Component,
  Output,
  EventEmitter,
  AfterContentInit,
  ContentChild,
  ContentChildren,
  QueryList, AfterViewInit, ViewChild
} from '@angular/core';

import { User } from './auth-form.interface';
import { AuthMessageComponent } from './auth-message.component';
import { AuthRememberComponent } from './auth-remember.component';

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

        <auth-message [style.display]="(showMessage ? 'inherit': 'none')"></auth-message>

        <!-- Grab the button tag that was passed onto this component -->
        <ng-content select="button"></ng-content>

      </form>
    </div>
  `
})
export class AuthFormComponent implements AfterContentInit, AfterViewInit {

  showMessage: boolean;

  @ViewChild(AuthMessageComponent)
  message: AuthMessageComponent;

  @ContentChildren(AuthRememberComponent)
  remember: QueryList<AuthRememberComponent>;

  @Output()
  submitted: EventEmitter<User> = new EventEmitter<User>();

  public ngAfterContentInit(): void {
    if (this.message) {
      this.message.days = 30;
    }

    if (this.remember) {
     // console.log(this.remember);
      this.remember.forEach((item) => {
        item.checked.subscribe((checked: boolean) => this.showMessage = checked);
      });
    }
  }

  public ngAfterViewInit(): void {
    // Do not make changes here as Angular will fail on the event lifecycle
    console.log(this.message.days);
  }

  onSubmit(value: User) {
    this.submitted.emit(value);
  }
}
