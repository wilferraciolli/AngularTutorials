import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MailViewComponent } from './mail-view.component';


// guard to check whether the user can deactivate the component, this will take the actual component as a parameter, so it can run some logic to work out whether the deactivate is allowed
@Injectable()
export class MailViewGuard implements CanDeactivate<MailViewComponent> {

  public canDeactivate(component: MailViewComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //   console.log('Deactivate ', component);
    if (component.hasUnsavedChanges) {
      return window.confirm('Are you sure you want to leave?, you have unsaved chages');
    }
    return Observable.of(true);
  }

}
