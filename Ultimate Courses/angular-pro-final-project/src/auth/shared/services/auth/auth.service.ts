import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Store } from 'store';

import 'rxjs/add/operator/do';

export interface User {
  email: string,
  uid: string,
  authenticated: boolean
}

@Injectable()
export class AuthService {
  // use the rxjs do function to set the user from the values from Firebase
  auth$ = this.af.authState
              .do(next => {
                if (!next) {
                  this.store.set('user', null);
                  // return if no user is authenticated
                  return;
                }

                //handle user authenticated
                const user: User = {
                  email: next.email,
                  uid: next.uid,
                  authenticated: true
                };
                this.store.set('user', user);
              });

  // manages angular fire to managed auth
  constructor(
    private af: AngularFireAuth,
    private store: Store
  ) {
  }

  get user() {
    // get current user
    return this.af.auth.currentUser;
  }

  get authState(): Observable<any> {
    return this.af.authState;
  }

  createUser(email: string, password: string) {
    return this.af.auth
               .createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string) {
    return this.af.auth
               .signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    return this.af.auth
               .signOut();
  }
}
