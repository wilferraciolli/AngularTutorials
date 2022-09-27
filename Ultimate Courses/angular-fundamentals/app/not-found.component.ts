import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div>
      <h1>Not found component,
        <a routerLink="/">go home</a>
      </h1>
    </div>
  `
})
export class NotFoundComponent {

}
