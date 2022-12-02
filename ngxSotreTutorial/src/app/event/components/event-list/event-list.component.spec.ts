import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Attendee } from '../../../models';

import { EventListComponent } from './event-list.component';

describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventListComponent]
    })                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no attendees on load', () => {
    expect(component.attendees?.length).toEqual(0);
  });

  it('should update attendees when added', () => {
    // add attendee and run change detection
    component.attendees = [
      { name: 'Duncan', attending: true, guests: 2 }
    ] as Attendee[];

    fixture.detectChanges();

    expect(component.attendees?.length).toEqual(1);
  });
});
