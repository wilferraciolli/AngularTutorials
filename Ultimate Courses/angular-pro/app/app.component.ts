import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div>
        <example-one></example-one>
        <example-two></example-two>
        <example-three></example-three>
    </div>
  `
})
export class AppComponent {

  constructor() {
  }
}
