import {Component, signal, WritableSignal} from '@angular/core';
import {ArrayDataForm, arrayDataSchema, initialState} from '../models/array-data.form';
import {FieldState, FieldTree, form, FormField} from '@angular/forms/signals';
import {ErrorDetails} from '../../shared/error-details/error-details';
import {JsonPipe} from '@angular/common';
import {MatButton, MatMiniFabButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/list';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-array-form',
  imports: [
    ErrorDetails,
    JsonPipe,
    MatButton,
    MatDivider,
    MatFormField,
    MatInput,
    MatLabel,
    FormField,
    MatMiniFabButton,
    MatIcon
  ],
  templateUrl: './array-form.html',
  styleUrl: './array-form.scss',
})
export class ArrayForm {
  // 1. The writable signal — single source of truth
  protected readonly arrayModel: WritableSignal<ArrayDataForm> = signal<ArrayDataForm>(initialState);

  // 2. The form — wraps the signal, creates the FieldTree
  protected readonly arrayDataForm: FieldTree<ArrayDataForm> = form(
    this.arrayModel,
    arrayDataSchema
  );

  // 3. Read data at submit time directly from the signal
  protected handleSubmit(): void {
    const root: FieldState<ArrayDataForm> = this.arrayDataForm();
    // Only submit if the whole form is valid
    if (root.invalid()) {
      root.errorSummary().forEach(e => console.warn(e.message));
      return;
    }
    console.log('Submitted:', this.arrayDataForm());
  }

  protected clearForm(): void {
    this.arrayModel.set(initialState);
    this.arrayDataForm().reset();
  }

  protected removePhone(index: number): void {
    this.arrayModel.update((current: ArrayDataForm) => ({
      ...current,
      phoneNumbers: current.phoneNumbers.filter((_, i) => i !== index)
    }));
  }

  protected addPhone(): void {
    this.arrayModel.update((current: ArrayDataForm) => ({
      ...current,
      phoneNumbers: [...current.phoneNumbers, '']
    }));
  }
}
