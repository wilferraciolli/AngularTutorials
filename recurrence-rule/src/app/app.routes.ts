import { Routes } from '@angular/router';
import { RecurrenceRuleComponent } from './components/recurrence-rule/recurrence-rule.component';
import { ThemeComponent } from './components/theme/theme.component';

export const routes: Routes = [
  {
    path: '',
    component: RecurrenceRuleComponent
  },
  {
    path: 'theme',
    component: ThemeComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
