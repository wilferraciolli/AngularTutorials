import {Component, signal, WritableSignal} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {DynamicForm} from '../dynamic-form/dynamic-form';
import {form} from '@angular/forms/signals';
import {createEmptyEntity, defineSchema, toSchema} from '../dynamic-form.utils';

import {FormFieldType} from '../form-field.constant';
import {JsonPipe} from '@angular/common';
import {MatDivider} from '@angular/material/list';
import {AllFieldsSchema, AppointmentSchema, FlightSchema} from '../interfaces/schema-definition.schema';
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
      {name: 'id', type: FormFieldType.TEXT, label: 'Id', disabled: true, hidden: true},
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
      {name: 'id', type: FormFieldType.TEXT, label: 'Id', disabled: true, hidden: true},
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

  // ******************************************** ALL FIELDS DEMO *****************************************************
  // ALL FIELDS: form config - demonstrates every field type
  protected readonly allFieldsFormConfig = defineSchema<AllFieldsSchema>({
    schemaType: 'allFields',
    fields: [
      {name: 'id', type: FormFieldType.TEXT, label: 'Id', disabled: true, hidden: true},
      {name: 'schemaType', type: FormFieldType.TEXT, label: 'Schema Type', required: true},
      {name: 'username', type: FormFieldType.TEXT, label: 'Username', required: true, minLength: 3, maxLength: 20},
      {name: 'password', type: FormFieldType.PASSWORD, label: 'Password', required: true, minLength: 8},
      {name: 'searchQuery', type: FormFieldType.SEARCH, label: 'Search Query', maxLength: 50},
      {name: 'birthDate', type: FormFieldType.DATE, label: 'Birth Date', required: true},
      {name: 'appointmentTime', type: FormFieldType.TIME, label: 'Appointment Time', required: true},
      {name: 'eventDateTime', type: FormFieldType.DATE_TIME, label: 'Event Date & Time', required: true},
      {
        name: 'gender',
        type: FormFieldType.RADIO,
        label: 'Gender',
        required: true,
        options: [
          {label: 'Male', value: 'male'},
          {label: 'Female', value: 'female'},
          {label: 'Other', value: 'other'},
          {label: 'Prefer not to say', value: 'not_specified'}
        ]
      },
      {
        name: 'country',
        type: FormFieldType.SELECT,
        label: 'Country',
        required: true,
        options: [
          {label: 'Select a country...', value: ''},
          {label: 'United States', value: 'us'},
          {label: 'United Kingdom', value: 'uk'},
          {label: 'Canada', value: 'ca'},
          {label: 'Australia', value: 'au'},
          {label: 'Germany', value: 'de'},
          {label: 'France', value: 'fr'},
          {label: 'Japan', value: 'jp'},
          {label: 'Other', value: 'other'}
        ]
      },
      {name: 'acceptTerms', type: FormFieldType.CHECKBOX, label: 'Accept Terms & Conditions', required: true},
      {name: 'age', type: FormFieldType.NUMBER, label: 'Age', required: true},
      {name: 'satisfaction', type: FormFieldType.RANGE, label: 'Satisfaction Level (1-10)'}
    ],
    initialValue: createEmptyEntity<AllFieldsSchema>('allFields', {
      username: '',
      password: '',
      searchQuery: '',
      birthDate: '',
      appointmentTime: '',
      eventDateTime: '',
      gender: 'not_specified',
      country: '',
      acceptTerms: false,
      age: 0,
      satisfaction: 5
    })
  });

  // ALL FIELDS: initial state
  protected readonly allFieldsEntity: WritableSignal<AllFieldsSchema> = signal(
    this.allFieldsFormConfig.initialValue
  );

  // ALL FIELDS: form
  protected readonly allFieldsForm = form(
    this.allFieldsEntity,
    toSchema<AllFieldsSchema>(this.allFieldsFormConfig.fields)
  );

  protected handleClearAllFieldsForm(): void {
    this.allFieldsEntity.set(this.allFieldsFormConfig.initialValue);
    this.allFieldsForm().reset();
  }

  protected handleAllFieldsSubmit() {
    console.log('All Fields Form Submitted:', this.allFieldsEntity());
    const data = this.allFieldsEntity();
    console.log(`Username: ${data.username}, Age: ${data.age}, Gender: ${data.gender}`);
    this.allFieldsForm().reset();
  }
}
