import {ApplicationConfig, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},  // ← forces DD/MM/YYYY order
    provideNativeDateAdapter({
      parse: {
        dateInput: 'DD/MM/YYYY',  // not actually used by NativeDateAdapter — it uses new Date()
      },
      display: {
        // Intl.DateTimeFormat options — NOT format strings
        dateInput: {
          day:   '2-digit',
          month: '2-digit',
          year:  'numeric',
        },
        monthYearLabel: {
          month: 'short',
          year:  'numeric',
        },
        dateA11yLabel: {
          day:   'numeric',
          month: 'long',
          year:  'numeric',
        },
        monthYearA11yLabel: {
          month: 'long',
          year:  'numeric',
        },
      },
    }),
  ]
};
