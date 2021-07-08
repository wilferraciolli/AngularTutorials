import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { TutorialGoogleMapsComponent } from './tutorial-google-maps/tutorial-google-maps.component';
import { MarkerComponent } from './marker/marker.component';

@NgModule({
  declarations: [
    TutorialGoogleMapsComponent,
    MarkerComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  exports: [
    TutorialGoogleMapsComponent,
    MarkerComponent
  ],
})
export class TutorialGoogleMapsModule {}
