import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Attendee } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getAttendees(): Observable<Attendee[]> {
    return this.httpClient
               .get<Attendee[]>('api/attendees');
  }

  addAttendee(attendee: Attendee): Observable<Attendee> {
    return this.httpClient
               .post<Attendee>('/api/attendees', attendee);
  }
}
