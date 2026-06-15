import {Component, input, InputSignal, output} from '@angular/core';
import {FieldState, FieldTree, FormField} from '@angular/forms/signals';
import {FieldDef} from '../interfaces/field-definition';
import {ErrorDetails} from '../../shared/error-details/error-details';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButton} from '@angular/material/button';
import {BaseSchema} from '../interfaces/base.schema';

@Component({
  selector: 'app-dynamic-form',
  imports: [
    ErrorDetails,
    MatTabsModule,
    FormField,
    MatButton
  ],
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.scss',
})
export class DynamicForm<T extends BaseSchema = BaseSchema> {
  public metaInfo: InputSignal<FieldDef[]> = input.required<FieldDef[]>();
  public dynamicForm: InputSignal<FieldTree<T>> = input.required<FieldTree<T>>();

  public onFormSubmit = output<void>();
  public onFormClear = output<void>();

  protected handleSubmit(): void {
    const fieldTree: FieldTree<unknown> = this.dynamicForm();  // Get the FieldTree from InputSignal
    const fieldState: FieldState<unknown> = fieldTree();  // Call the FieldTree to get the FieldState

    if (fieldState.valid()) {
      this.onFormSubmit.emit();
    }
  }

  protected clearForm(): void {
    this.onFormClear.emit();
  }
}
