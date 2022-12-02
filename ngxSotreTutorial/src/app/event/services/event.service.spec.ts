import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Attendee } from '../../models';

import { EventService } from './event.service';

describe('EventService', () => {
  let httpTestingController: HttpTestingController;
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventService]
    });
    eventService = TestBed.inject(EventService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(eventService).toBeTruthy();
  });

  it('should get attendees', () => {
    const testAttendees: Attendee[] = [
      {
        name: 'Test Data',
        attending: true,
        guests: 1
      }
    ];

    // subscribe to the observable
    eventService.getAttendees().subscribe();

    const req = httpTestingController.expectOne('api/attendees');

    // make sure that the request was the right path and method
    expect(req.request.method).toEqual('GET');

    // clean up
    req.flush(testAttendees);

    // check that there were no more pending requests
    httpTestingController.verify();
  });
});
