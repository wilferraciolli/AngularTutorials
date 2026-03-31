import {Component, signal, WritableSignal} from '@angular/core';
import {FieldDef} from '../interfaces/field-definition';
import {MatTabsModule} from '@angular/material/tabs';
import {DynamicForm} from '../dynamic-form/dynamic-form';
import {form} from '@angular/forms/signals';
import {toSchema} from '../dynamic-form.utils';
import {FormFieldType} from '../form-field.constant';
import {JsonPipe} from '@angular/common';
import {MatDivider} from '@angular/material/list';

@Component({
  selector: 'app-dynamic-sample-form',
  imports: [MatTabsModule, DynamicForm, JsonPipe, MatDivider],
  templateUrl: './dynamic-sample-form.html',
  styleUrl: './dynamic-sample-form.scss',
})
export class DynamicSampleForm {
  // ******************************************** FLIGHTS *****************************************************
  // FLIGHTS: form config
  protected readonly flightFormConfig: FieldDef[] = [
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
  ];
  // FLIGHTS: initial state
  private readonly flightEntity: WritableSignal<unknown> = signal({
    id: '', from: '', to: '', date: '', delayed: false
  });
  // FLIGHTS: form
  protected readonly flightsForm = form(
    this.flightEntity,
    toSchema(this.flightFormConfig));

  // ******************************************** APPOINTMENT *****************************************************
  // APPOINTMENT: form config
  protected readonly appointmentFormConfig: FieldDef[] = [
    {name: 'id', type: FormFieldType.TEXT, label: 'Id', required: true},
    {name: 'name', type: FormFieldType.TEXT, label: 'Name', required: true, minLength: 3, maxLength: 30},
    {name: 'startDate', type: FormFieldType.DATE, label: 'Start Day', required: true},
    {name: 'endDate', type: FormFieldType.TIME, label: 'End Day', required: true},
    {name: 'duration', type: FormFieldType.NUMBER, label: 'Duration', required: true}
  ];
  // APPOINTMENT: initial state
  private readonly appointmentEntity: WritableSignal<unknown> = signal({
    id: '', name: '', startDate: '', endDate: '', duration: 0
  });
  // APPOINTMENT: form
  protected readonly appointmentsForm = form(
    this.appointmentEntity,
    toSchema(this.appointmentFormConfig));
}
