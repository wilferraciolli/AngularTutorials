import {Component, signal, WritableSignal} from '@angular/core';
import {FieldState, FieldTree, form, FormField} from '@angular/forms/signals';
import {CrossFieldDataForm, crossFieldSchema} from '../cross-field-data.form';
import {ErrorDetails} from '../../shared/error-details/error-details';
import {JsonPipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/list';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';

@Component({
  selector: 'app-cross-field-form',
  imports: [
    ErrorDetails,
    JsonPipe,
    MatButton,
    MatDivider,
    MatFormField,
    MatInput,
    MatLabel,
    FormField
  ],
  templateUrl: './cross-field-form.html',
  styleUrl: './cross-field-form.scss',
})
export class CrossFieldForm {
  // 1. The writable signal — single source of truth
  protected readonly crossFieldModel: WritableSignal<CrossFieldDataForm> = signal({
    username: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: ''
  });

  // 2. The form — wraps the signal, creates the FieldTree
  protected readonly crossFieldForm: FieldTree<CrossFieldDataForm> = form(
    this.crossFieldModel,
    crossFieldSchema);

  // 3. Read data at submit time directly from the signal
  protected handleSubmit(): void {
    const root: FieldState<CrossFieldDataForm> = this.crossFieldForm();
    // Only submit if the whole form is valid
    if (root.invalid()) {
      root.errorSummary().forEach(e => console.warn(e.message));
      return;
    }
    console.log('Submitted:', this.crossFieldModel());
  }

  protected clearForm(): void {
    this.crossFieldModel.set({
      username: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: ''
    });

    // Reset touched/dirty state so error messages disappear
    this.crossFieldForm().reset();
  }
}
