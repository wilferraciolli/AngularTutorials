import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-geo-location',
  templateUrl: './geo-location.component.html',
  styleUrls: ['./geo-location.component.scss']
})
export class GeoLocationComponent implements OnInit {

  public ngOnInit(): void {
    if ('geolocation' in navigator) {

      // define the handle success callback function, it use object destructuring to get the coords
      // @ts-ignore
      const handleSuccessCallback = ({ coords }) => {
        // get the lat and long from coords using object destructuring
        const { latitude, longitude, accuracy } = coords;
        console.log(latitude, longitude, accuracy);
      };

      // define the handle failure callback function
      // @ts-ignore
      const handleFailureCallback = (error) => {
        // this could be any type of error, we should loop through to get the error message
        console.log(error);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.log('Permission Denied, please allow access to your location');
            break;
          case error.POSITION_UNAVAILABLE:
            console.log('Position unavailable');
            break;
          case error.TIMEOUT:
            console.log(error.message);
            break;
          default:
            console.log('Position Unavailable');
            break;
        }
      };

      // define the option to get geolocation
      const options: PositionOptions = {
        timeout: 1000,
        maximumAge: 0,
        enableHighAccuracy: true
      };

      this._getGeolocation(handleSuccessCallback, handleFailureCallback, options);
      this._getMostAccurateGeolocation(handleSuccessCallback, handleFailureCallback, options);
    }
  }

  private _getGeolocation(
    successFn: ({ coords }: { coords: any }) => void,
    errorFn: (error: any) => void,
    options: PositionOptions
  ): void {

    navigator.geolocation.getCurrentPosition(successFn, errorFn, options); // function to get position once
  }

  private _getMostAccurateGeolocation(
    successFn: ({ coords }: { coords: any }) => void,
    errorFn: (error: any) => void,
    options: PositionOptions
  ): void {

    const watcher= navigator.geolocation.watchPosition(successFn, errorFn, options); // function to watch the position and react to changes

    setTimeout(() => {
      navigator.geolocation.clearWatch(watcher); // stop watching the position
    }, 10000);
  }
}
