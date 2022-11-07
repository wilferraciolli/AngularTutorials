import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Mail } from '../../models/mail.interface';
import 'rxjs/add/operator/pluck';


@Component({
  selector: 'mail-folder',
  styleUrls: ['mail-folder.component.scss'],
  template: `
    <h2>{{ title | async }}</h2>

    <mail-item
      *ngFor="let message of (messages | async)"
      [message]="message">
    </mail-item>
  `
})
export class MailFolderComponent {

  title: Observable<string> = this.route.params.pluck('name');
  messages: Observable<Mail[]> = this.route.data.pluck('messages');

  constructor(private route: ActivatedRoute) {
    // console.log('The routing data is ', this.route.data);
    // console.log('The title is ', this.title);
  }
}
