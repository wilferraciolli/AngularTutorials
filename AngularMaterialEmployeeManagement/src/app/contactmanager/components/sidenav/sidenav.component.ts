import { Component, NgZone, OnInit } from '@angular/core';

const SMALL_WITH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  // method to get the size of the screen
  private mediaMatcher: MediaQueryList =
    matchMedia(`(max-width: ${SMALL_WITH_BREAKPOINT}px)`);

  constructor(zone: NgZone) {
    // this.mediaMatcher.addListener(mql =>      zone.run(() => this.mediaMatcher = mql));
  }

  ngOnInit() {
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
}
