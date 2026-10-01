import { Component } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { WeeklyComponent } from '../weekly/weekly.component';
import { MonthlyComponent } from '../monthly/monthly.component';
import { YearlyComponent } from '../yearly/yearly.component';

@Component({
  selector: 'wt-recurrence-rule',
  imports: [
    MatTabGroup,
    MatTab,
    WeeklyComponent,
    MonthlyComponent,
    YearlyComponent
  ],
  standalone: true,
  templateUrl: './recurrence-rule.component.html',
  styleUrl: './recurrence-rule.component.scss'
})
export class RecurrenceRuleComponent {}
