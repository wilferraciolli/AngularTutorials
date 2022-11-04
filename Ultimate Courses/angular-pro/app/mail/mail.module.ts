import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MailAppComponent } from './components/mail-app/mail-app.component';
import { MailItemComponent } from './components/mail-item/mail-item.component';

import { MailFolderComponent } from './containers/mail-folder/mail-folder.component';
import { MailFolderResolver } from './containers/mail-folder/mail-folder.resolver';
import { MailService } from './mail.service';

export const ROUTES: Routes = [
  {
    path: 'folder/:name',
    component: MailFolderComponent,
    resolve: {
      messages: MailFolderResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    MailFolderComponent,
    MailAppComponent,
    MailItemComponent
  ],
  exports: [
    MailAppComponent
  ],
  providers: [
    MailService,
    MailFolderResolver
  ]
})
export class MailModule {
}
