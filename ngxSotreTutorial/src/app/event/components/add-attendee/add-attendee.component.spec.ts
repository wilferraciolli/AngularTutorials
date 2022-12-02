import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Attendee } from '../../../models';

import { AddAttendeeComponent } from './add-attendee.component';

describe('AddAttendeeComponent', () => {
  let component: AddAttendeeComponent;
  let fixture: ComponentFixture<AddAttendeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AddAttendeeComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttendeeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form on load', () => {
    expect(component.addAttendeeForm.invalid).toEqual(true);
  });

  it('should have a valid form when fields are filled in ', () => {
    // set a value to the mandatory field
    let nameControl = component.addAttendeeForm.controls['name'];
    nameControl.setValue('Some name');

    expect(component.addAttendeeForm.valid).toEqual(true);
  });

  it('should emmit attendee when added', () => {
    // add a name to the form
    component.addAttendeeForm.controls['name'].setValue('Some name');

    // subscribe to the event and when receive value, then check that it matches
    component.addAttendee.subscribe((attendee: Attendee) => {
      expect(attendee.name).toEqual('Some name');
    });

    // emmit the event so subscribers should be able to handle it
    component.submit();
  });
});
