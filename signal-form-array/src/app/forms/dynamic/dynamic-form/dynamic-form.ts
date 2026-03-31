import {Component, input, InputSignal} from '@angular/core';
import {FieldState, FieldTree, FormField} from '@angular/forms/signals';
import {FieldDef} from '../interfaces/field-definition';
import {ErrorDetails} from '../../shared/error-details/error-details';
import {MatTabsModule} from '@angular/material/tabs';
import {FormFieldType} from '../form-field.constant';
import {JsonPipe} from '@angular/common';
import {MatDivider} from '@angular/material/list';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-dynamic-form',
  imports: [
    ErrorDetails,
    MatTabsModule,
    FormField,
    JsonPipe,
    MatDivider,
    MatButton
  ],
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.scss',
})
export class DynamicForm {
  // form config
  metaInfo: InputSignal<FieldDef[]> = input.required<FieldDef[]>();
  // function to export the field's state
  dynamicForm: InputSignal<() => FieldState<unknown>> = input.required<() => FieldState<unknown>>();

  // sample
  formConfig: FieldDef[] = [
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

  // entity = [...] as WritableSignal<unknown>;
  //  dynamicForm1 = form(this.entity, toSchema(this.meta))
}
