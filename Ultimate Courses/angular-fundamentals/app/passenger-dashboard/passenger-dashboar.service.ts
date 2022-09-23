import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Passenger } from './models/passenger.interface';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

const PASSENGER_API: string = '/api/passengers';

@Injectable()
export class PassengerDashboardService {

  constructor(private http: Http) {
  }

  getPassengers(): Observable<Passenger[]> {
    return this.http
               .get(PASSENGER_API)
               .map((response: Response) => response.json());
  }

  updatePassenger(passenger: Passenger): Observable<Passenger> {
    let headers = new Headers({
      'contentType': 'application/json'
    });

    let options = new RequestOptions({
      'headers': headers
    });

    return this.http
               .put(`${PASSENGER_API}/${passenger.id}`, passenger, options)
               .map((response: Response) => response.json());
  }

  removePassenger(passenger: Passenger): Observable<Passenger> {
    return this.http
               .delete(`${PASSENGER_API}/${passenger.id}`)
               .map((response: Response) => response.json());
  }
}
