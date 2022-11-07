import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { MailService } from '../../mail.service';
import { Mail } from '../../models/mail.interface';

@Injectable()
export class MailFolderResolve implements Resolve<Mail[]> {

  constructor(private mailService: MailService) {
  }

  // the route parameter will have data on current url, the state param represents the state of the router at the time it was called
  public resolve(route: ActivatedRouteSnapshot,
                 state: RouterStateSnapshot): Observable<Array<Mail>> {
    // return this.mailService.getFolder(route.params.name);
    return this.mailService.getFolder(route.params['name']);
  }
}
