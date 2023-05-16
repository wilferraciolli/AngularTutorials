import {Component, OnInit, ViewChild} from '@angular/core';
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(GoogleMap, { static: false })
  public map: GoogleMap | null;

  @ViewChild(MapInfoWindow, { static: false })
  public info: MapInfoWindow

  public zoom: number = 12;
  public center: google.maps.LatLngLiteral;
  public options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };
  public markers: any[] = [];
  public infoContent: string = '';

  constructor() {
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  zoomIn(): void {
    if (this.zoom < this.options?.maxZoom!) this.zoom++;
  }

  zoomOut(): void {
    if (this.zoom > this.options.minZoom!) this.zoom--;
  }

  click(event: google.maps.MapMouseEvent | google.maps.IconMouseEvent): void {
    console.log('Map clicked ', event);
  }

  logCenter() {
    console.log(JSON.stringify(this.map!.getCenter()))
  }

  // method to add markers to the map
  addMarker(): void {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    });
  }

  openInfo(marker: MapMarker, content: string): void {
    this.infoContent = content;
    this.info.open(marker);
  }
}
