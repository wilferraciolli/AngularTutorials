import { JsonPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DateFieldComponent } from './fields/date-field/date-field.component';
import { DateTimeFieldComponent } from './fields/date-time-field/date-time-field.component';
import { TimeFieldComponent } from './fields/time-field/time-field.component';
import { DateTimeFormBuilderService } from './forms/date-time-form-builder.service';
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
  private _dateTimeFormBuilder: DateTimeFormBuilderService = inject(DateTimeFormBuilderService);

  public form: FormGroup<DateTimeForm>;

  constructor() {
    this.form = this._dateTimeFormBuilder.form;
  }

  public ngOnInit(): void {
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

  public onSubmit(): void {
    console.log('Submitting form ', this._dateTimeFormBuilder.getFormValue());
  }

  public shouldDisableSubmit(): boolean {
    return this.form.invalid
      || this.form.untouched;
  }

  public resetForm(): void {
    this._dateTimeFormBuilder.resetFormValue();
  }
}
