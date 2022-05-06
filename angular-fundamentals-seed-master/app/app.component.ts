import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app">
      <h1>Sup {{title + '!'}}</h1>

      <button (click)="handleClick(username.value)">
        <span>Get value</span>
      </button>

      <!--    create the #ref variable so it can be used within the template to pass values  -->
      <input type="text" #username>
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

  public handleClick(value: string) {
    this.name = value;
  }
}
