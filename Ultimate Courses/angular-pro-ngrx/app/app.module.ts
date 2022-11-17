import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Store } from './store';

@NgModule({
  imports: [
    BrowserModule
  ],
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    Store
  ]
})
export class AppModule {}
