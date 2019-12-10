import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactmanager-app',
  template: `
<!-- Root component for contact manager -->
    <app-sidenav></app-sidenav>
  `,
  styles: []
})
export class ContactmanagerAppComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
