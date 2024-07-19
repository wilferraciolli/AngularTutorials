import { JsonPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DateFieldComponent } from './fields/date-field/date-field.component';
import { DateTimeFieldComponent } from './fields/date-time-field/date-time-field.component';
import { TimeFieldComponent } from './fields/time-field/time-field.component';
import { DateTimeForm } from './forms/date-time.form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, ReactiveFormsModule, DateFieldComponent, JsonPipe, NgIf, TimeFieldComponent,
    DateTimeFieldComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  form!: FormGroup<DateTimeForm>;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group<DateTimeForm>({
      date: this.formBuilder.control('2024-01-01'),
      time: this.formBuilder.control('09:00'),
      dateTime: this.formBuilder.control('2024-01-01T09:00')
      // dateTime: this.formBuilder.control('2024-01-01T09:00', {
      //   validators: [Validators.required]
      // })
    });
  }

  get date(): FormControl<string | null> {
    return this.form.controls.date;
  }

  get time(): FormControl<string | null> {
    return this.form.controls.time;
  }

  get dateTime(): FormControl<string | null> {
    return this.form.controls.dateTime;
  }
}
