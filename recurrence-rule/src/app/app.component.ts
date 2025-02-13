import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { MonthlyComponent } from './components/monthly/monthly.component';
import { WeeklyComponent } from './components/weekly/weekly.component';
import { YearlyComponent } from './components/yearly/yearly.component';

@Component({
  selector: 'wt-root',
  imports: [
    RouterOutlet, MatToolbar, MatIcon, MatIconButton, MatTabGroup, MatTab, WeeklyComponent, MonthlyComponent,
    YearlyComponent
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'recurrence-rule';
}
