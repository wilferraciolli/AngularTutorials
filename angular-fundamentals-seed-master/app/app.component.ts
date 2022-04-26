import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app">
      <h1>Sup {{title + '!'}}</h1>

      <button (click)="handleClickEvent()">
        <span>Change name</span>
      </button>

      <input type="text"
             [value]="name"
             (input)="handleInput($event)"
             (blur)="handleBlur($event)"
      >
      <div>{{name}}</div>
    </div>
  `,
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  title: string;
  public name: string = 'Name';

  constructor() {
    this.title = 'Title';
  }

  public handleBlur($event: FocusEvent) {
    this.name = event.target.value;
    console.log(event);
  }

  public handleInput($event: Event) {
    this.name = event.target.value;
    console.log(event);
  }

  public handleClickEvent() {
    this.name = 'Updated Name';
  }
}
