import { HttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { BehaviorSubject, of } from 'rxjs';
import { Attendee } from '../../../models';
import { EventService } from '../../services/event.service';
import { State } from '../../state';

import { EventComponent } from './event.component';

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;
  let service: EventService;
  let store: Store<State>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: null },
        {
          provide: EventService, useValue: {
            getAttendees: () => {
            }
          }
        },
        {
          provide: Store, useValue: {
            pipe: () => {            },
            dispatch: jest.fn()
          }
        }
      ],
      declarations: [EventComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(EventService);
    store = TestBed.inject(Store);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of attendees', () => {
    const subject = new BehaviorSubject<Attendee[]>([]);
    const fakeAttendees = [{ name: 'FAKE NAME', attending: false, guests: 0 }];

    // mock the call to get attendees within the service
    spyOn(store, 'pipe').and.returnValue(of(subject));

    subject.next(fakeAttendees);
    component.ngOnInit();

    component.attendees$.subscribe((attendees: Attendee[]) => {
      expect(attendees).toEqual(fakeAttendees);
    });

  });
});
