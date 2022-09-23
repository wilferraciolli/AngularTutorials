import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Passenger } from './models/passenger.interface';
import { Http, Response } from '@angular/http';

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
}
