import {Component, signal, WritableSignal} from '@angular/core';
import {AttributeDataForm, attributeInitialValue, attributeSchema} from '../models/attribute-data.form';
import {FieldState, FieldTree, form, FormField} from '@angular/forms/signals';
import {ErrorDetails} from '../../shared/error-details/error-details';
import {JsonPipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/list';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow} from '@angular/material/chips';
import {MatIcon} from '@angular/material/icon';
import {MatSlideToggle} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-attribute-form',
  imports: [
    ErrorDetails,
    JsonPipe,
    MatButton,
    MatDivider,
    MatFormField,
    MatInput,
    MatLabel,
    FormField,
    MatChipGrid,
    MatChipRow,
    MatIcon,
    MatChipInput,
    MatChipRemove,
    MatSlideToggle
  ],
  templateUrl: './attribute-form.html',
  styleUrl: './attribute-form.scss',
})
export class AttributeForm {
  // 1. the writable signal single source of truth
  protected readonly model: WritableSignal<AttributeDataForm> = signal<AttributeDataForm>(attributeInitialValue);

  // 2. The form — wraps the signal, creates the FieldTree
  protected readonly form: FieldTree<AttributeDataForm> = form(
    this.model,
    attributeSchema
  );

  // 3. Read data at submit time directly from the signal
  protected handleSubmit(): void {
    const root: FieldState<AttributeDataForm> = this.form();
    // Only submit if the whole form is valid
    if (root.invalid()) {
      root.errorSummary().forEach(e => console.warn(e.message));
      return;
    }
    console.log('Submitted:', this.model());
  }

  protected clearForm(): void {
    this.model.set(attributeInitialValue);

    // Reset touched/dirty state so error messages disappear
    this.form().reset();
  }

  protected removeTemplateKeyword(item: string): void {
    console.log(`Removing ${item}`);
    this.model.update((m: AttributeDataForm) => ({
      ...m,
      beverage: m.beverage.filter(b => b !== item)
    }));
  }

  protected addTemplateKeyword(event: MatChipInputEvent) {
    console.log(`Adding ${event.value}`);
    const value: string = (event.value || '').trim()

    if (value) {
      this.model.update((m: AttributeDataForm) => ({
        ...m,
        beverage: [...m.beverage, value]
      }));
    }

    event.chipInput!.clear();
  }
}
