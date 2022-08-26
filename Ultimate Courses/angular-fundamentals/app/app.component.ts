import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div class="app">
      <button (click)="handleClick($event)">
        Change Name
      </button>

      <!-- two way data binding using property and event binding -->
      <input
        type="text"
        [ngModel]="name"
        (ngModelChange)="handleChange($event)"
      >

      <!-- two way data binding -->
      <input
        type="text"
        [(ngModel)]="name"
      >

      <div>{{name}}</div>
    </div>
  `
})
export class AppComponent {
  name: string = 'Test';

  // this will be triggered every input of the keyboar
  public handleInput(event: any) {
    this.name = event.target.value;
  }

  public handleClick(event: MouseEvent) {
    this.name = 'button clicked';

    console.log(event);
  }

  public handleChange(value: string) {
    this.name = value;
  }
}
