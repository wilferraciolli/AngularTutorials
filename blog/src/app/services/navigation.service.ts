import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private showNav$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    // here any navigation events (i.e. clicking on the nav items to go to a separate page)
    // will be captured inside this subscription, then we hide the nav by setting
    // the showNav$ to false or in our case, calling the setShowNav to false, which does the same
    router.events.subscribe(() => {
      this.setShowNav(false);
    });
  }

  getShowNav(): Observable<boolean> {
    return this.showNav$.asObservable();
  }

  setShowNav(showHide: boolean): void {
    this.showNav$.next(showHide);
  }

  toggleNavState(): void {
    this.showNav$.next(!this.showNav$.value);
  }

  isNavOpen(): boolean {
    return this.showNav$.value;
  }
}
