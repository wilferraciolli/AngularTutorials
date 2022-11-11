import { Component, DoCheck, NgZone, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  styles: [],
  template: `
    <div>
      counter: {{  counter }}
    </div>
  `
})
export class AppComponent implements OnInit, DoCheck {
  counter = 0;

  constructor(private zone: NgZone) {
  }


  public ngOnInit() {

    // make the code to run outside the angular lifecycle (kind of async)
    this.zone.runOutsideAngular(() => {
      for (let i = 0; i < 100; i++) {
        setTimeout(() => this.counter++);
      }

      this.zone.run(() => {
        setTimeout(() => this.counter = this.counter, 1000)
      })
    });
  }

  public ngDoCheck() {
    console.log('Change detection has been run!');
  }

}
