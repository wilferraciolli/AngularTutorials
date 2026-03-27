import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {DateAdapter, MAT_DATE_FORMATS, provideNativeDateAdapter} from '@angular/material/core';
import {STRING_DATE_FORMATS, StringDateAdapter} from './core/string-date.adapter';
import {MatDatepickerIntl} from '@angular/material/datepicker';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // provideAnimationsAsync(),
    provideNativeDateAdapter(),
    MatDatepickerIntl
    // ── String date adapter ──────────────────────────────────────────────
    // {provide: DateAdapter,      useClass: StringDateAdapter},
    // {provide: MAT_DATE_FORMATS, useValue: STRING_DATE_FORMATS},
  ]
};
