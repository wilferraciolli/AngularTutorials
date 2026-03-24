import { Routes } from '@angular/router';
import {ContactForm} from './forms/contacts/contact-form/contact-form';

export const routes: Routes = [
  {
    path: '',
    component: ContactForm,
  },
  {
    path: 'admin',
    component: ContactForm,
  },
];
