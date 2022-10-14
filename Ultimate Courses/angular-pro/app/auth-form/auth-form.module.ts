import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthFormComponent } from './auth-form.component';
import { AuthMessageComponent } from './auth-message.component';
import { AuthRememberComponent } from './auth-remember.component';

@NgModule({
  declarations: [
    AuthFormComponent,
    AuthRememberComponent,
    AuthMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AuthFormComponent,
    AuthRememberComponent,
    AuthMessageComponent
  ],
  entryComponents: [
    AuthFormComponent
  ]
})
export class AuthFormModule {}
