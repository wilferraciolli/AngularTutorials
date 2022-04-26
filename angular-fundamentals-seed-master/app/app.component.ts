import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app">
      <h1>Sup {{title + '!'}}</h1>

      <button (click)="handleClickEvent()">
        <span>Change name</span>
      </button>

      <!--   angulars two way data binding   -->
      <input type="text"
             [(ngModel)]="name"
      >

      <!--   two way data binding   -->
      <input type="text"
             [ngModel]="name"
             (ngModelChange)="handleChange($event)"
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

  public handleChange(value: string) {
    this.name = value;
    console.log(event);
  }

  public handleClickEvent() {
    this.name = 'Updated Name';
  }
}
