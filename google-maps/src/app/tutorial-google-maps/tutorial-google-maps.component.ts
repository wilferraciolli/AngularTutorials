import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-tutorial-google-maps',
  templateUrl: './tutorial-google-maps.component.html',
  styleUrls: ['./tutorial-google-maps.component.scss']
})
export class TutorialGoogleMapsComponent implements OnInit {

  apiLoaded: Observable<boolean>;
  options: google.maps.MapOptions = {
    center: {lat: 64.48113363780652, lng: 16.33826752001327},
    zoom: 4
  };

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyC83ynFZWgOl69vxNOc0ms9i-bhl7XCZXE', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  ngOnInit(): void {
  }

}
