import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate, CanActivateChild {

  constructor(private authService: AuthService) {}

  canLoad(): Observable<boolean> {
    return this.authService.checkPermissions();
  }

  // check whether can activate the whole of the path including the parent
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn();
  }

  // check whether can active child of a path
  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
    return Observable.of(true);
  }
}
