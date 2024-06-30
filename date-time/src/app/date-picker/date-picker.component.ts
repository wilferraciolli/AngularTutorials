import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { DatePipe, NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DatePipe,
    NgForOf,
    NgIf
  ],
  styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent {
  @Input()
  parentFormGroup!: FormGroup;
  showDatePicker: boolean = false;
  dates: any[] = [];

  constructor() {
    this.initDates();
  }

  initDates() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        const date = new Date(year, month, i * 7 + j);
        row.push(date);
      }
      this.dates.push(row);
    }
  }

  selectDate(date: Date) {
    // @ts-ignore
    this.parentFormGroup.get('businessDate').setValue(date);
    this.showDatePicker = false;
  }
}
