import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

// service to check if the user logged on and is an admin
@Injectable()
export class AuthService {

  user = { isAdmin: true };

  checkPermissions(): Observable<boolean> {
    return Observable.of(this.user.isAdmin);
  }

  isLoggedIn(): Observable<boolean> {
    return Observable.of(true);
  }
}
