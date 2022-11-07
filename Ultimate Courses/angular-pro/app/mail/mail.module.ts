import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AuthModule } from '../auth/auth.module';
import { MailAppComponent } from './components/mail-app/mail-app.component';
import { MailItemComponent } from './components/mail-item/mail-item.component';
import { MailViewComponent } from './components/mail-view/mail-view.component';
import { MailViewResolve } from './components/mail-view/mail-view.resolve';
import { MailFolderResolve } from './containers/mail-folder/mail-folder-resolve';

import { MailFolderComponent } from './containers/mail-folder/mail-folder.component';

import { MailService } from './mail.service';

export const ROUTES: Routes = [
  {
    path: 'mail',
    canActivateChild: [AuthGuard],
    component: MailAppComponent,
    children: [
      {
        path: 'folder/:name',
        component: MailFolderComponent,
        resolve: {
          messages: MailFolderResolve
        }
      },
      {
        path: 'message/:id',
        component: MailViewComponent,
        outlet: 'pane',
        resolve: {
          message: MailViewResolve
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    AuthModule,
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    MailFolderComponent,
    MailAppComponent,
    MailItemComponent,
    MailViewComponent
  ],
  exports: [
    MailAppComponent
  ],
  providers: [
    MailService,
    MailFolderResolve,
    MailViewResolve
  ]
})
export class MailModule {
}
