import {Component, input, InputSignal} from '@angular/core';
import {FieldState, FormField} from '@angular/forms/signals';
import {FieldDef} from '../interfaces/field-definition';
import {ErrorDetails} from '../../shared/error-details/error-details';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-dynamic-form',
  imports: [
    ErrorDetails,
    MatTabsModule,
    FormField
  ],
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.scss',
})
export class DynamicForm {
  // form config
  metaInfo: InputSignal<FieldDef[]> = input.required<FieldDef[]>();
  // function to export the field's state
  dynamicForm: InputSignal<() => FieldState<unknown>> = input.required<() => FieldState<unknown>>();

  formConfig: FieldDef[] = [
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

  // entity = [...] as WritableSignal<unknown>;
  //  dynamicForm1 = form(this.entity, toSchema(this.meta))
}
