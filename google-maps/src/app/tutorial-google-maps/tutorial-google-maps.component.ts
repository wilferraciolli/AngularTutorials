import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map } from 'rxjs/operators';
import { LocationService } from '../services/location.service';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'

@Component({
  selector: 'app-tutorial-google-maps',
  templateUrl: './tutorial-google-maps.component.html',
  styleUrls: ['./tutorial-google-maps.component.scss']
})
export class TutorialGoogleMapsComponent implements OnInit {

  apiLoaded: Observable<boolean>;

  // @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  options: google.maps.MapOptions = {
    center: { lat: 64.48113363780652, lng: 16.33826752001327 },
    zoom: 15
  };

  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    label: 'Label defined',
    title: 'Title visible on mouse holover'
  };
  markerPositions: google.maps.LatLngLiteral[] = [];

  constructor(httpClient: HttpClient,
              locationService: LocationService) {
    locationService.getPosition().then(pos => {
      // @ts-ignore
      this.options.center.lat = pos.lat;
      // @ts-ignore
      this.options.center.lng = pos.lng;
      // let latLng =
      //   {
      //     lat: pos.lat,
      //     lng: pos.lng
      //   }
      // this.addMarker(latLng);
    });

    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyC83ynFZWgOl69vxNOc0ms9i-bhl7XCZXE&libraries=visualization', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  addMarker(event: google.maps.MapMouseEvent) {
    console.log(event.latLng.toJSON());
    this.markerPositions.push(event.latLng.toJSON());
  }

  ngOnInit(): void {
  }

  markerClicked(event: MouseEvent) {
    console.log(event);
  }

  openInfoWindow(marker: MapMarker, bla: any) {

    console.log('The value passed from the marker is', bla);

    console.log(marker.getLabel());
    console.log(marker.getTitle());
    // console.log(marker);
    this.infoWindow.open(marker);
  }
}
