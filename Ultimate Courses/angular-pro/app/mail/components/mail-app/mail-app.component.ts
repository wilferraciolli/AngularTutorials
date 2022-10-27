import { Component } from '@angular/core';

@Component({
  selector: 'mail-app',
  styleUrls: ['mail-app.component.scss'],
  template: `
    <div class="mail">
      <router-outlet
      (activate)="onActivate($event)"
      (deactivate)="onDeactivate($event)"
      >

      </router-outlet>
    </div>
  `
})
export class MailAppComponent {

  public onActivate(event: any) {
    // when the compoennet created on the routeer outlet is created
    console.log('Activated', event);
  }

  public onDeactivate(event: any) {
    // when the compoennet created on the routeer outlet is destroyed
    console.log('Deactivated', event);
  }
}
