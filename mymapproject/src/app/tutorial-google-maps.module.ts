import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { TutorialGoogleMapsComponent } from './tutorial-google-maps/tutorial-google-maps.component';

@NgModule({
  declarations: [
    TutorialGoogleMapsComponent,
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  exports: [
    TutorialGoogleMapsComponent,
  ],
})
export class TutorialGoogleMapsModule {}
