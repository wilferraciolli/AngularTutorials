import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';

import { User } from './auth-form.interface';
import { AuthMessageComponent } from './auth-message.component';
import { AuthRememberComponent } from './auth-remember.component';

@Component({
  selector: 'auth-form',
  styles: [`
           .email {             border-color: #9f72e6;           }
           `],
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
                 ngModel
                 #email>
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

  @ViewChild('email') //Query by #ref to get the native element
  email: ElementRef;

  @ViewChildren(AuthMessageComponent)
  message: QueryList<AuthMessageComponent>;

  @ContentChildren(AuthRememberComponent)
  remember: QueryList<AuthRememberComponent>;

  @Output()
  submitted: EventEmitter<User> = new EventEmitter<User>();

  constructor(private changeDetection: ChangeDetectorRef) {
  }

  public ngAfterViewInit(): void {
    // get the ViewChild bvy #ref and set values on the element
    console.log(this.email.nativeElement);
    this.email.nativeElement.setAttribute('placeholder', 'Enter your email address');
    this.email.nativeElement.classList.add('email');
    this.email.nativeElement.focus();

    // ViewChildren is only available in this lifecycle
    if (this.message) {
      this.message.forEach((message) =>
        message.days = 30
      );
      this.changeDetection.detectChanges();
    }
  }

  public ngAfterContentInit(): void {
    if (this.remember) {
      // console.log(this.remember);
      this.remember.forEach((item) => {
        item.checked.subscribe((checked: boolean) => this.showMessage = checked);
      });
    }
  }

  onSubmit(value: User) {
    this.submitted.emit(value);
  }
}
