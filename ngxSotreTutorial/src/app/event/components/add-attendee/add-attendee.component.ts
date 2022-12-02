import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Attendee } from '../../../models';

@Component({
  selector: 'app-add-attendee',
  templateUrl: './add-attendee.component.html',
  styleUrls: ['./add-attendee.component.scss']
})
export class AddAttendeeComponent {
  @Output()
  addAttendee = new EventEmitter<Attendee>();

  addAttendeeForm = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  submit(): void {
    const attendee = {
      name: this.addAttendeeForm.value.name,
      attending: true,
      guests: 0
    };

    // publish event when button was pushed
    this.addAttendee.emit(attendee);
  }
}
