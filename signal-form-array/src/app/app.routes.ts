import { Routes } from '@angular/router';
import {ContactForm} from './forms/contacts/contact-form/contact-form';
import {Home} from './home/home';
import {CrossFieldForm} from './forms/cross-fields/cross-field-form/cross-field-form';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'forms/contact',
    component: ContactForm,
  },
  {
    path: 'forms/cross-field',
    component: CrossFieldForm,
  },
  {
    path: '**',
    redirectTo: '',
  }
];
