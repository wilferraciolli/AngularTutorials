import { Component } from '@angular/core';

@Component({
  selector: 'login',
  template: `
    <div>
      <auth-form>
        <h1>Login</h1>
        <a routerLink="/auth/register">Not registered?</a>
        <button type="submit">
          Login
        </button>
      </auth-form>
    </div>
  `
})
export class LoginComponent {

}
