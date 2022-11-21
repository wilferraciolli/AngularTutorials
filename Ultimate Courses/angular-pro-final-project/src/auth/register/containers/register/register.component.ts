import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'register',
  template: `
    <div>
      <auth-form
        (submitted)="registerUser($event)">
        <h1>Register</h1>
        <a routerLink="/auth/login">Already have an account?</a>
        <button type="submit">
          Create account
        </button>

        <!-- Add errors if fails -->
        <div class="error"
             *ngIf="error">
          {{ error }}
        </div>
      </auth-form>
    </div>
  `
})
export class RegisterComponent {
  error: string;

  constructor(
    private authService: AuthService,
    private router: Router) {
  }


  async registerUser(event: FormGroup) {
    // console.log('Event received from registering ', event.value);

    // deconstruct the value passed and construct it onto a new object
    const { email, password } = event.value;
    try {
      await this.authService.createUser(email, password);
      this.router.navigate(['/']);
    } catch (err) {
      // assign the error and display on the component
      console.log('Firebase error message ', err.message);
      this.error = err.message;
    }
  }
}
