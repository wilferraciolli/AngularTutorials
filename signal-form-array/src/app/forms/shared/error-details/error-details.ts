import {Component, computed, input} from '@angular/core';
import {FieldState, FieldTree, ValidationError} from '@angular/forms/signals';
import {MatError} from '@angular/material/form-field';

@Component({
  selector: 'app-error-details',
  imports: [
    MatError
  ],
  templateUrl: './error-details.html',
  styleUrl: './error-details.scss',
})
export class ErrorDetails {
  readonly formField = input.required<FieldTree<unknown>>();

  protected readonly errors = computed<ValidationError.WithFieldTree[]>(() => {
    const fieldTree: FieldTree<unknown> = this.formField();  // Get the FieldTree from InputSignal
    const fieldState: FieldState<unknown> = fieldTree();  // Call the FieldTree to get the FieldState

    if (fieldState.touched() && fieldState.invalid()) {
      return fieldState.errors();
    }

    return [];
  });
}
