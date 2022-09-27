import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Passenger } from './models/passenger.interface';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

const PASSENGER_API: string = '/api/passengers';

@Injectable()
export class PassengerDashboardService {

  constructor(private http: Http) {
  }

  public getPassenger(id: number): Observable<Passenger> {
    return this.http
               .get(`${PASSENGER_API}/${id}`)
               .map(((response: Response) => response.json()))
               .catch((error: any) => Observable.throw(error.json()));
  }

  getPassengers(): Observable<Passenger[]> {
    return this.http
               .get(PASSENGER_API)
               .map(((response: Response) => response.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  updatePassenger(passenger: Passenger): Observable<Passenger> {
    let headers = new Headers({
      'contentType': 'application/json'
    });

    let options = new RequestOptions({
      'headers': headers
    });

    return this.http
               .put(`${ PASSENGER_API }/${ passenger.id }`, passenger, options)
               .map((response: Response) => response.json())
               .catch((error: any) => Observable.throw(error.json()));
  }

  removePassenger(passenger: Passenger): Observable<Passenger> {
    return this.http
               .delete(`${ PASSENGER_API }/${ passenger.id }`)
               .map((response: Response) => response.json())
               .catch((error: any) => Observable.throw(error.json()));
  }

  getPassengersPromise(): Promise<Passenger[]> {
    return this.http
               .get(PASSENGER_API)
               .toPromise()
               .then((response: Response) => response.json());
  }

  updatePassengerPromise(passenger: Passenger): Promise<Passenger> {
    let headers = new Headers({
      'contentType': 'application/json'
    });

    let options = new RequestOptions({
      'headers': headers
    });

    return this.http
               .put(`${ PASSENGER_API }/${ passenger.id }`, passenger, options)
               .toPromise()
               .then((response: Response) => response.json());
  }

  removePassengerPromise(passenger: Passenger): Promise<Passenger> {
    return this.http
               .delete(`${ PASSENGER_API }/${ passenger.id }`)
               .toPromise()
               .then((response: Response) => response.json());
  }


}
