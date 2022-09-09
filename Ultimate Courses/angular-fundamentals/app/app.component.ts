import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div class="app">
      <input
        type="text"
        [value]="name"
        (input)="handleChange($event)"
      >

      <div *ngIf="name.length > 3">
        Searching for... {{name}}
      </div>
    </div>
  `
})
export class AppComponent {
  name: string = '';

  // public handleChange(value: string) {
  //   this.name = value;
  // }
  public handleChange(event: Event) {
    this.name = (event.target as HTMLInputElement).value;
    console.log((event.target as HTMLInputElement).value);
    // console.log(value.);
    // console.log(value);
  }
}
