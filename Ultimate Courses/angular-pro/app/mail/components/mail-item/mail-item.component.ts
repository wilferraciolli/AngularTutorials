import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Mail } from '../../models/mail.interface';

@Component({
  selector: 'mail-item',
  styleUrls: ['mail-item.component.scss'],
  template: `
    <!-- navigate the user to the named router outlet   -->
    <a
      class="mail-item"
      (click)="navigateToMessage()"
      routerLinkActive="active">
      <h3>
        {{ message.from }}
        <span>{{ message.timestamp | date:'shortTime' }}</span>
      </h3>
      <p>{{ message.summary }}</p>
    </a>
  `
})
export class MailItemComponent {
  @Input()
  message: Mail;

  constructor(private router: Router) {
  }

  public navigateToMessage(): void {
    this.router.navigate(
      ['', { outlets: { pane: ['message', this.message.id] } }]
    );
  }
}
