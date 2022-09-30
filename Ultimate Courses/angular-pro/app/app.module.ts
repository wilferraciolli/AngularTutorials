import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthFormModule } from './auth-form/auth-form.module';

@NgModule({
  imports: [
    BrowserModule,
    AuthFormModule
  ],
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ]
})
export class AppModule {}
