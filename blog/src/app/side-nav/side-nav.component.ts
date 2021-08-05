import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {SideNavDirection} from './side-nav-direction';
import {NavigationService} from '../services/navigation.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  showSideNav: Observable<boolean>;

  // this will provide a placeholder into the component for people to embed other child components into it, using one of the available directives in Angular called NgTemplateOutlet. We’ll come back to it later.
  @Input()
  sidenavTemplateRef: any;

  // sets the duration (in seconds) of the sliding animation of the side nav bar. Default is 0.25 secs.
  @Input()
  duration: number = 0.25;

  // sets the width of the side nav bar (in pixels). Default is the width of the window’s innerWidth.
  @Input()
  navWidth: number = window.innerWidth;

  // this is where we’ll use the enumeration created earlier, which will allow the direction from which the side nav bar will slide out. Default is Left.
  @Input()
  direction: SideNavDirection = SideNavDirection.Left;

  constructor(private navService: NavigationService) {
  }

  ngOnInit(): void {
    this.showSideNav = this.navService.getShowNav();
  }

  onSidebarClose(): void {
    this.navService.setShowNav(false);
  }

  // TODO remove as dont want it
  getSideNavBarStyle(showNav: boolean): any {
    const navBarStyle: any = {};

    navBarStyle.transition = this.direction + ' ' + this.duration + 's, visibility ' + this.duration + 's';
    navBarStyle.width = this.navWidth + 'px';
    navBarStyle[this.direction] = (showNav ? 0 : (this.navWidth * -1)) + 'px';

    return navBarStyle;
  }

}
