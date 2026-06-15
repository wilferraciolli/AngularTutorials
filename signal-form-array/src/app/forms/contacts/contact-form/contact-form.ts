import {Component, signal, WritableSignal} from '@angular/core';
import {FieldState, FieldTree, form, FormField} from '@angular/forms/signals';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ContactDataForm, contactSchema} from '../models/contact-data.form';
import {MatButton} from '@angular/material/button';
import {JsonPipe} from '@angular/common';
import {MatDivider} from '@angular/material/list';
import {ErrorDetails} from '../../shared/error-details/error-details';

@Component({
  selector: 'app-contact-form',
  imports: [
    FormField,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    JsonPipe,
    MatDivider,
    ErrorDetails,
  ],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm {
  // 1. The writable signal — single source of truth
  protected readonly contactModel: WritableSignal<ContactDataForm> = signal<ContactDataForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  // 2. The form — wraps the signal, creates the FieldTree
  protected readonly contactForm: FieldTree<ContactDataForm> = form(
    this.contactModel,
    contactSchema);

  // 3. Read data at submit time directly from the signal
  protected handleSubmit(): void {
    const root: FieldState<ContactDataForm> = this.contactForm();
    // Only submit if the whole form is valid
    if (root.invalid()) {
      root.errorSummary().forEach(e => console.warn(e.message));
      return;
    }
    console.log('Submitted:', this.contactModel());
  }

  protected clearForm(): void {
    this.contactModel.set({
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    });

    // Reset touched/dirty state so error messages disappear
    this.contactForm().reset();
  }
}
