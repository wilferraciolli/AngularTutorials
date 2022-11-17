import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SongsModule } from './songs/songs.module';
import { Store } from './store';

@NgModule({
  imports: [
    BrowserModule,
    SongsModule
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
