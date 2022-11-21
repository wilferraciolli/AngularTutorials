import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'auth-form',
  styleUrls: ['auth.form.component.scss'],
  template: `
    <div class="auth-form">
      <form [formGroup]="form"
            (ngSubmit)="onSubmit()">

        <!-- Select the h1 tag from the component to project value  -->
        <ng-content select="h1"></ng-content>

        <label>
          <input type="email"
                 placeholder="Email Address"
                 formControlName="email">
        </label>
        <div class="error"
             *ngIf="emailFormat">
          Invalid email format
        </div>

        <label>
          <input type="password"
                 placeholder="Enter password"
                 formControlName="password">
        </label>
        <div class="error"
             *ngIf="passwordInvalid">
          Password is required
        </div>

        <!-- Display errors from server -->
        <ng-content select=".error"></ng-content>

        <!-- Add actions -->
        <div class="auth-form__action">
          <ng-content select="button"></ng-content>
        </div>

        <!-- Switch between login and register -->
        <div class="auth-form__toggle">
          <ng-content select="a"></ng-content>
        </div>

      </form>
    </div>
  `
})
export class AuthFormComponent {

  @Output()
  submitted = new EventEmitter<FormGroup>();

  form = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {
  }

  public onSubmit(): void {
    if (this.form.valid) {
      // send the whole form as event
      this.submitted.emit(this.form);
    }
  }

  get passwordInvalid() {
    const control = this.form.get('password');

    return control.hasError('required') && control.touched;
  }

  get emailFormat() {
    const control = this.form.get('email');

    return control.hasError('email') && control.touched;
  }
}
