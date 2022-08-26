import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div class="app">
      <button (click)="handleClick($event)">
        Change Name
      </button>

      <input
        type="text"
        [value]="name"
        (input)="handleInput($event)"
        (blur)="handleBlur($event)"
      >

      <div>{{name}}</div>
    </div>
  `
})
export class AppComponent {
  name: string = 'Test';

  // this will be handled each time a user leaves the inmput box
  public handleBlur(event: any): void {
    this.name = event.target.value;
    console.log(event);
  }

  // this will be triggered every input of the keyboar
  public handleInput(event: any) {
    this.name = event.target.value;
  }

  public handleClick(event: MouseEvent) {
    this.name = 'button clicked';

    console.log(event);
  }
}
