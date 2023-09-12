import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-geo-location',
  templateUrl: './geo-location.component.html',
  styleUrls: ['./geo-location.component.scss']
})
export class GeoLocationComponent implements OnInit {

  public ngOnInit(): void {
    if ('geolocation' in navigator) {
      console.log('Geolocation enabled');
    }
  }

}
