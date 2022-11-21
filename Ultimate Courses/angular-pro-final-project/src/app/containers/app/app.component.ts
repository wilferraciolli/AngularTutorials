import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Store } from 'store';
import { AuthService, User } from '../../../auth/shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div>
      <h1>{{ user$ |async| json }}</h1>
      <div class="wrapper">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit, OnDestroy {

  // manage the user logged on here so it can force users to be logged on
  user$: Observable<User>;
  subscription: Subscription;

  constructor(
    private store: Store,
    private authService: AuthService) {
  }

  public ngOnInit(): void {
    // initiate the user from the auth service
    this.subscription = this.authService.auth$.subscribe();
    this.user$ = this.store.select('user');
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
