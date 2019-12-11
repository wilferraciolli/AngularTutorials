import { Component, NgZone, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';

const SMALL_WITH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

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

    this.users.subscribe(data => {
      // navigate to the first item on te list if ant
      if (data.length > 0) {
        this.router.navigate(['contactmanager', data[0].id]);
      }
    });
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
}
