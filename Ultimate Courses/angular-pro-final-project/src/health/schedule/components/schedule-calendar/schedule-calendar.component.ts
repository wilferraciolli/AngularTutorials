import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'schedule-calendar',
  styleUrls: ['schedule-calendar.component.scss'],
  template: `
    <div class="calendar">

      <schedule-controls
        [selected]="selectedDay"
        (move)="onChange($event)">
      </schedule-controls>

      <schedule-days
        [selected]="selectedDayIndex"
        (select)="selectDay($event)">
      </schedule-days>
    </div>
  `
})
export class ScheduleCalendarComponent implements OnChanges {

  selectedDayIndex: number;
  selectedDay: Date;
  selectedWeek: Date;

  @Input()
  set date(date: Date) {
    this.selectedDay = new Date(date.getTime());
  }

  @Output()
  change = new EventEmitter<Date>();

  constructor() {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
  }

  // handle when the dates are moved back and forth
  onChange(weekOffset: number) {
    const startOfWeek = this.getStartOfWeek(new Date());
    const startDate = (
      new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate())// get the start date for the next week
    );
    startDate.setDate(startDate.getDate() + (weekOffset * 7));
    this.change.emit(startDate);// emit event when date was changed
  }

  // handle when the user clicks on a specific day within a week
  public selectDay(index: number) {
    const selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + index); // get the week and add the index to get the selected day chosen within the week

    // emmit another event after updating the day selected
    this.change.emit(selectedDay);
  }

  private getStartOfWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // calculate the difference between the dates
    return new Date(date.setDate(diff)); //return next week or start of previous week
  }


  private getToday(date: Date): number {
    let today = date.getDay() - 1;

    if (today < 0) {
      today = 6;
    }

    return today;
  }


}
