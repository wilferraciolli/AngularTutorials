import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-geo-location',
  templateUrl: './geo-location.component.html',
  styleUrls: ['./geo-location.component.scss']
})
export class GeoLocationComponent implements OnInit {

  public ngOnInit(): void {
    if ('geolocation' in navigator) {

      // define the handle success callback function
      // @ts-ignore
      const handleSuccess = ({ coords }) => {
        const { latitude, longitude } = coords;
        console.log(latitude, longitude);
      };


      this._getGeolocation(handleSuccess);


    }
  }

  private _getGeolocation(successFn: ({ coords }: { coords: any }) => void): void {
    // get the inner variable or coordinates and assign it to coords
    // navigator.geolocation.getCurrentPosition(({ coords }) => {
    //   console.log(coords);
    //
    //   // get the lat and long from coords
    //   const { latitude, longitude } = coords;
    //   console.log(latitude, longitude);
    // });
    //
    navigator.geolocation.getCurrentPosition(successFn);
  }
}
