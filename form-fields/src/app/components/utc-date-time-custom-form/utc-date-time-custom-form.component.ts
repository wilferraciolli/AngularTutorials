import {Component, signal, WritableSignal} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {FieldState, form, FormField, FormRoot} from '@angular/forms/signals';
import {TimeZone, TIMEZONES} from "../date-time-form/timezone";
import {initialState, UTCDateTimeForm, utcDateTimeFormSchema} from "../utc-date-time-form/models/utc-date-time-form";
import {Temporal} from "temporal-polyfill";
import {
  UtcDateTimeCustomFieldComponent
} from "../../fields/utc-date-time-custom-field/utc-date-time-custom-field.component";

@Component({
  selector: 'app-utc-date-time-custom-form',
  imports: [
    JsonPipe,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    FormField,
    FormRoot,
    UtcDateTimeCustomFieldComponent
  ],
  styleUrl: './utc-date-time-custom-form.component.scss',
  templateUrl: './utc-date-time-custom-form.component.html',
})
export class UtcDateTimeCustomFormComponent {
  protected readonly timezones: TimeZone[] = TIMEZONES;

  // 1. The writable signal — single source of truth
  public model: WritableSignal<UTCDateTimeForm> = signal<UTCDateTimeForm>(initialState);

  // 2. The form — wraps the signal, creates the FieldTree
  public form = form(
    this.model,
    utcDateTimeFormSchema);

  // 3. Read data at submit time directly from the signal
  protected handleSubmit(): void {
    const root: FieldState<UTCDateTimeForm> = this.form();
    // Only submit if the whole form is valid
    if (root.invalid()) {
      root.errorSummary().forEach(e => console.warn(e.message));
      return;
    }
    console.log('Submitted:', this.model());
  }

  public convertToTimeZone(timeZone: string): string {
    const currentAppointment = this.form.appointment().value();
    if (!currentAppointment) {
      return '';
    }

    try {
      return Temporal.Instant.from(currentAppointment)
        .toZonedDateTimeISO(timeZone)
        .toPlainDateTime()
        .toString({smallestUnit: 'minute'})
        .replace('T', ' ');
    } catch {
      return '';
    }
  }
}
