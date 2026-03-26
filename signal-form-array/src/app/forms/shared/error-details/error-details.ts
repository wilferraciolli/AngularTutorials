import {Component, input} from '@angular/core';
import {FieldTree, ValidationError} from '@angular/forms/signals';
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
// FieldTree<unknown> covers any field — string, number, etc.
  readonly formField = input.required<FieldTree<unknown>>();

  protected get errors(): ValidationError.WithFieldTree[] {
    const state = this.formField()();  // call FieldTree to get FieldState
    if (state.touched() && state.invalid()) {
      return state.errors();
    }
    return [];
  }
}
