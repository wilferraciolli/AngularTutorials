import { Injectable } from '@angular/core';
import { FLIGHTS, MYFLIGHTS } from '../model/mock-flights';
import { Flight } from '../model/flight';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable()
export class FlightsService {

  constructor(private http: HttpClient) { }
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  public getFlights(): Observable<Flight[]> {
    const url = 'http://localhost:8080/flightserver/allflights';

    return this.http.get<Flight[]>(url).pipe(catchError(this.handleError));
  }

  public getChunkOfFlights( start: number, num: number): Observable<Flight[]> {
    const url = 'http://localhost:8080/flightserver/flights';
    const data = {start, num};
    const resultObservable = this.http.post<Flight[]>(url, JSON.stringify(data), {headers: this.headers})
                              .pipe(catchError(this.handleError));
    return resultObservable;
  }


  public getNumberOfFlights(): Observable<number> {
    const url = 'http://localhost:8080/flightserver/numflights';
    return this.http.get<number>(url).pipe(catchError(this.handleError));
  }


  public getMyFlights(): Flight[] {
    return MYFLIGHTS;
  }

  private handleError(error: HttpErrorResponse )  {
    if (error.error instanceof ErrorEvent) {
      // Client error
      console.error('Http communication error:', error.error.message );
    } else {
      // Server error
      console.error(`Server error: ${error.status}. Message body: ${error.message}`);
    }
    return throwError( 'Server error - is the REST server running?');
  }

}
