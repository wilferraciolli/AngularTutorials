import {Component, signal} from '@angular/core';
import {form, FormField} from '@angular/forms/signals';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ContactData} from '../models/contact';
import {MatButton} from '@angular/material/button';
import {JsonPipe} from '@angular/common';
import {MatDivider} from '@angular/material/list';

@Component({
  selector: 'app-contact-form',
  imports: [
    FormField,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    JsonPipe,
    MatDivider,
  ],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm {
  // 1. The writable signal — single source of truth
  protected readonly contactModel = signal<ContactData>({
    firstName: '',
    lastName:  '',
    email:     '',
    phone:     '',   // null = empty optional field
  });

  // 2. The form — wraps the signal, creates the FieldTree
  protected readonly contactForm = form(this.contactModel);

  // 3. Read data at submit time directly from the signal
  protected handleSubmit(): void {
    const data: ContactData = this.contactModel();
    console.log(data);
  }

  protected clearForm(): void {
    this.contactModel.set({
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    })
  }

  protected readonly form = form;
}
