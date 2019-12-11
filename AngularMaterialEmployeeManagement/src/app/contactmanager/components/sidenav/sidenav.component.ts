import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

const SMALL_WITH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  users: Observable<User[]>;
  // method to get the size of the screen
  private mediaMatcher: MediaQueryList =
    matchMedia(`(max-width: ${SMALL_WITH_BREAKPOINT}px)`);

  constructor(zone: NgZone,
              private userService: UserService,
              private router: Router) {
    // this.mediaMatcher.addListener(mql => zone.run(() => this.mediaMatcher = mql));
  }

  ngOnInit() {

    this.users = this.userService.users;
    this.userService.loadAll();

    // get events from users router navigation to close the sidenav if screen is small
    this.router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
      }
    });
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
}
