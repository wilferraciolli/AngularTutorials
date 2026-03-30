import {Component, signal, WritableSignal} from '@angular/core';
import {FieldDef} from '../interfaces/field-definition';
import {MatTabsModule} from '@angular/material/tabs';
import {DynamicForm} from '../dynamic-form/dynamic-form';
import {form} from '@angular/forms/signals';
import {toSchema} from '../dynamic-form.utils';

@Component({
  selector: 'app-dynamic-sample-form',
  imports: [MatTabsModule, DynamicForm],
  templateUrl: './dynamic-sample-form.html',
  styleUrl: './dynamic-sample-form.scss',
})
export class DynamicSampleForm {
  // ******************************************** FLIGHTS *****************************************************
  // FLIGHTS: form config
  protected readonly flightFormConfig: FieldDef[] = [
    {name: 'id', label: 'Id', required: true},
    {
      name: 'from',
      label: 'From',
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    {name: 'to', label: 'To', required: true, minLength: 3, maxLength: 20},
    {name: 'date', label: 'Date', required: true, type: 'datetime-local'},
    {name: 'delayed', label: 'Delayed', type: 'checkbox'}
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
    {name: 'id', label: 'Id', required: true},
    {name: 'name', label: 'Name', required: true, minLength: 3, maxLength: 30},
    {name: 'startDate', label: 'Start Day', required: true, type: 'datetime-local'},
    {name: 'endDate', label: 'End Day', required: true, type: 'datetime-local'}
  ];
  // APPOINTMENT: initial state
  private readonly appointmentEntity: WritableSignal<unknown> = signal({
    id: '', name: '',  startDate: '', endDate: ''
  });
  // APPOINTMENT: form
  protected readonly appointmentsForm = form(
    this.appointmentEntity,
    toSchema(this.appointmentFormConfig));
}
