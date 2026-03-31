import {Component, signal, WritableSignal} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {DynamicForm} from '../dynamic-form/dynamic-form';
import {form} from '@angular/forms/signals';
import {createEmptyEntity, defineSchema, toSchema} from '../dynamic-form.utils';

import {FormFieldType} from '../form-field.constant';
import {JsonPipe} from '@angular/common';
import {MatDivider} from '@angular/material/list';
import {AppointmentSchema, FlightSchema} from '../interfaces/schema-definition.schema';
import {SchemaConfig} from '../interfaces/base.schema';

@Component({
  selector: 'app-dynamic-sample-form',
  imports: [MatTabsModule, DynamicForm, JsonPipe, MatDivider],
  templateUrl: './dynamic-sample-form.html',
  styleUrl: './dynamic-sample-form.scss',
})
export class DynamicSampleForm {
  // ******************************************** FLIGHTS *****************************************************
  // FLIGHTS: form config
  protected readonly flightFormConfig: SchemaConfig<FlightSchema> = defineSchema<FlightSchema>({
    schemaType: 'flight',
    fields: [
      {name: 'id', type: FormFieldType.TEXT, label: 'Id', required: true},
      {
        name: 'from',
        type: FormFieldType.TEXT,
        label: 'From',
        required: true,
        minLength: 3,
        maxLength: 20,
      },
      {name: 'to', type: FormFieldType.TEXT, label: 'To', required: true, minLength: 3, maxLength: 20},
      {name: 'date', type: FormFieldType.DATE_TIME, label: 'Date', required: true},
      {name: 'delayed', type: FormFieldType.CHECKBOX, label: 'Delayed'}
    ],
    initialValue: createEmptyEntity<FlightSchema>('flight', {
      from: '', to: '', date: '', delayed: false
    })
  });

  // FLIGHTS: initial state
  protected readonly flightEntity: WritableSignal<FlightSchema> = signal(this.flightFormConfig.initialValue);
  // FLIGHTS: form
  protected readonly flightsForm = form(
    this.flightEntity,
    toSchema<FlightSchema>(this.flightFormConfig.fields)
  );

  protected handleClearFlightForm(): void {
    this.flightEntity.set(this.flightFormConfig.initialValue);
    this.flightsForm().reset();
  }

  protected handleFlightSubmit() {
    console.log('Submitted:', this.flightEntity());
    this.flightsForm().reset();
  }

  // ******************************************** APPOINTMENT *****************************************************
  // APPOINTMENT: form config
  protected readonly appointmentFormConfig = defineSchema<AppointmentSchema>({
    schemaType: 'appointment',
    fields: [
      {name: 'id', type: FormFieldType.TEXT, label: 'Id', required: true},
      {name: 'name', type: FormFieldType.TEXT, label: 'Name', required: true, minLength: 3, maxLength: 30},
      {name: 'startDate', type: FormFieldType.DATE, label: 'Start Day', required: true},
      {name: 'startTime', type: FormFieldType.TIME, label: 'StartTime', required: true},
      {name: 'duration', type: FormFieldType.NUMBER, label: 'Duration', required: true}
    ],
    initialValue: createEmptyEntity<AppointmentSchema>('appointment', {
      name: '',
      startDate: '',
      startTime: '',
      duration: 0
    })
  });
  // APPOINTMENT: initial state
  protected readonly appointmentEntity: WritableSignal<AppointmentSchema> = signal(this.appointmentFormConfig.initialValue);
  // APPOINTMENT: form
  protected readonly appointmentsForm = form(
    this.appointmentEntity,
    toSchema<AppointmentSchema>(this.appointmentFormConfig.fields)
  );

  protected handleClearAppointmentForm(): void {
    this.appointmentEntity.set(this.appointmentFormConfig.initialValue);
    this.flightsForm().reset();
  }

  protected handleAppointmentSubmit() {
    console.log('Submitted:', this.appointmentEntity());
    this.flightsForm().reset();
  }
}
