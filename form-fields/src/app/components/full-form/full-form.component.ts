import { Component, inject } from '@angular/core';
import { DateFieldComponent } from "../../fields/date-field/date-field.component";
import { DateTimeFieldComponent } from "../../fields/date-time-field/date-time-field.component";
import { JsonPipe, NgIf } from "@angular/common";
import { MatButton } from "@angular/material/button";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { TimeFieldComponent } from "../../fields/time-field/time-field.component";
import { DateTimeFormBuilderService } from "../../forms/date-time-form-builder.service";
import { DateTimeService } from "../../fields/date-time-field/date-time.service";
import { DateTimeForm } from "../../forms/date-time.form";
import { RouterOutlet } from "@angular/router";
import { MatTab, MatTabGroup } from "@angular/material/tabs";

@Component({
  selector: 'app-full-form',
  standalone: true,
  imports: [
    DateFieldComponent,
    DateTimeFieldComponent,
    JsonPipe,
    MatButton,
    MatTabGroup,
    MatTab,
    NgIf,
    ReactiveFormsModule,
    RouterOutlet,
    TimeFieldComponent
  ],
  templateUrl: './full-form.component.html',
  styleUrl: './full-form.component.scss'
})
export class FullFormComponent {
  private _dateTimeFormBuilder: DateTimeFormBuilderService = inject(DateTimeFormBuilderService);
  private _dateTimeService: DateTimeService = inject(DateTimeService);

  public form: FormGroup<DateTimeForm>;

  constructor() {
    this.form = this._dateTimeFormBuilder.form;
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
