import { Routes } from '@angular/router';
import {ContactForm} from './forms/contacts/contact-form/contact-form';
import {Home} from './home/home';
import {CrossFieldForm} from './forms/cross-fields/cross-field-form/cross-field-form';
import {DynamicSampleForm} from './forms/dynamic/dynamic-sample-form/dynamic-sample-form';
import {ArrayForm} from './forms/arrays/array-form/array-form';

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
    path: 'forms/arrays',
    component: ArrayForm,
  },  {
    path: 'forms/dynamic-form',
    component: DynamicSampleForm,
  },
  {
    path: '**',
    redirectTo: '',
  }
];
