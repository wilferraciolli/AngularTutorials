import { Injectable } from '@angular/core';
import moment from 'moment';
import { datetime, Frequency, Options, RRule } from 'rrule';

@Injectable({
  providedIn: 'root'
})
export class RruleService {
  constructor() {
  }

  // used to convert from BYSETPOS onto a week of the month
  public static monthWeeksSetPosition: { [key: number]: string } = {
    [1]: 'first',
    [2]: 'second',
    [3]: 'third',
    [4]: 'fourth',
    [-1]: 'last'
  };

  public generateRRule(rrule: string): RRule {
    const options: Partial<Options> = RRule.parseString(rrule);
    options.dtstart = datetime(2024, 1, 1, 10, 30);

    return new RRule(options);
  }

  public generateFirstInstance(rrule: string): string {
    // as library does not have that ability, then get the first item
    return this.generateRRuleDates(rrule)[0];
  }

  public generateRRuleDates(rrule: string): Array<string> {
    const rule: RRule = this.generateRRule(rrule);

    return rule.all().map((date: Date) =>
      moment(date).format('YYYY-MM-DD HH:mm'));
  }

  public generateRRuleBaseDescription(rrule: string): string {
    const rule: RRule = this.generateRRule(rrule);

    return rule.toText();
  }

  public generateRRuleDescription(rrule: string): string {
    const rule: RRule = this.generateRRule(rrule);

    const data: IRecurrenceData = this._generateDataBasedOnRRule(rule);
    const count: number = data.count || 0;
    const startDate: string = '01/01/2024';
    const untilDate: string = '31/12/2024';
    const startTime: string = '09:00';
    const endTime: string = '09:30';
    // console.log('RRULE ', rule.options);
    // console.log('DATA ', data);

    if (data.frequency === Frequency.WEEKLY) {
      // @ts-ignore
      const weekDays: string = data.weeklySelectedDays
                                   .map((day: number) => moment().day(day).format('dddd'))
                                   .join(', ');
      const interval: number = data.weeklyInterval || 1;

      if (count > 0) {
        // with count
        if (interval > 1) {
          return `Occurs on ${ weekDays } of every ${ interval } weeks effective from ${ startDate } for ${ count } check-ins from ${ startTime } to ${ endTime }`;
        } else {
          return `Occurs on ${ weekDays } of every week effective from ${ startDate } for ${ count } check-ins from ${ startTime } to ${ endTime }`;
        }
      } else {
        // with until date
        if (interval > 1) {
          return `Occurs on ${ weekDays } of every ${ interval } weeks effective from ${ startDate } until ${ untilDate } from ${ startTime } to ${ endTime }`;
        } else {
          return `Occurs on ${ weekDays } of every week effective from ${ startDate } until ${ untilDate } from ${ startTime } to ${ endTime }`;
        }
      }
    }

    if (data.frequency === Frequency.MONTHLY) {
      const interval: number = data.monthlyInterval || 1;
      const byMonthDay: number = data.monthlyMonthDay || 0;

      if (byMonthDay > 0) {
        // day of the month
        if (count > 0) {
          if (interval > 1) {
            return `Occurs on day ${ byMonthDay } of every ${ interval } months effective from ${ startDate } for ${ count } check-ins from ${ startTime } to ${ endTime }`;
          } else {
            return `Occurs on day ${ byMonthDay } of every month effective from ${ startDate } for ${ count } check-ins from ${ startTime } to ${ endTime }`;
          }
        } else {
          // not count
          if (interval > 1) {
            return `Occurs on day ${ byMonthDay } of every ${ interval } months effective from ${ startDate } until ${ untilDate } from ${ startTime } to ${ endTime }`;
          } else {
            return `Occurs on day ${ byMonthDay } of every month effective from ${ startDate } until ${ untilDate } from ${ startTime } to ${ endTime }`;
          }
        }
      } else {
        const setPositionIndex: number = data.monthlySetPosition || 0;
        const monthWeek: string = RruleService.monthWeeksSetPosition[setPositionIndex];
        const monthWeekDay: number = data.monthlySelectedDays?.[0] || 0;
        const weekDay: string = moment().day(monthWeekDay).format('dddd');

        // by set position
        if (count > 0) {
          if (interval > 1) {
            return `Occurs on the ${ monthWeek } ${ weekDay } of every ${ interval } months effective from ${ startDate } for ${ count } check-ins from ${ startTime } to ${ endTime }`;
          } else {
            return `Occurs on the ${ monthWeek } ${ weekDay } of every month effective from ${ startDate } for ${ count } check-ins from ${ startTime } to ${ endTime }`;
          }
        } else {
          // not count
          if (interval > 1) {
            return `Occurs on the ${ monthWeek } ${ weekDay } of every ${ interval } months effective from ${ startDate } until ${ untilDate } from ${ startTime } to ${ endTime }`;
          } else {
            return `Occurs on the ${ monthWeek } ${ weekDay } of every month effective from ${ startDate } until ${ untilDate } from ${ startTime } to ${ endTime }`;
          }
        }
      }
    }

    if (data.frequency === Frequency.YEARLY) {
      const yearlyMonthDay: number = data.yearlyMonthDay || 0;
      const monthIndex: number = data.yearlyBy || 0;
      const month: string = moment().month(monthIndex).format('MMMM');

      if (yearlyMonthDay > 0) {
        // day of the month
        if (count > 0) {
          return `Occurs on day ${ yearlyMonthDay } in ${ month } of every year effective from ${ startDate } for ${ count } check-ins from ${ startTime } to ${ endTime }`;

        } else {
          // not count
          return `Occurs on day ${ yearlyMonthDay } in ${ month } of every year effective from ${ startDate } until ${ untilDate } from ${ startTime } to ${ endTime }`;
        }
      } else {
        const yearlySetPositionIndex: number = data.yearlySetPosition || 0;
        const monthWeek: string = RruleService.monthWeeksSetPosition[yearlySetPositionIndex];
        const yearlyWeekDay: number = data.yearlySelectedDays?.[0] || 0;
        const weekDay: string = moment().day(yearlyWeekDay).format('dddd');

        // by set position
        if (count > 0) {
          return `Occurs on the ${ monthWeek } ${ weekDay } of ${ month } every year effective from ${ startDate } for ${ count } check-ins from ${ startTime } to ${ endTime }`;
        } else {
          // not count
          return `Occurs on the ${ monthWeek } ${ weekDay } of ${ month } every year effective from ${ startDate } until ${ untilDate } from ${ startTime } to ${ endTime }`;
        }
      }
    }

    return 'todo';
  }

  private _generateDataBasedOnRRule(rule: RRule): IRecurrenceData {
    return {
      frequency: rule.options.freq,

      weeklySelectedDays: rule.options.byweekday?.map((day) => day + 1),
      weeklyInterval: rule.options.interval,

      monthlyInterval: rule.options.interval,
      monthlyBy: rule.options.bymonth?.[0],
      monthlyMonth: rule.options.bymonth?.[0],
      monthlyMonthDay: rule.options.bymonthday?.[0],
      monthlySetPosition: rule.options.bysetpos?.[0],
      monthlySelectedDays: rule.options.byweekday?.map((day) => day + 1),

      yearlyBy: rule.options.bymonth?.[0] - 1,
      yearlyMonthDay: rule.options.bymonthday?.[0],
      yearlySetPosition: rule.options.bysetpos?.[0],
      yearlySelectedDays: rule.options.byweekday?.map((day) => day + 1),

      until: rule.options.until,
      count: rule.options.count
    };
  }
}

export interface IRecurrenceData {
  frequency: Frequency;
  weeklySelectedDays?: Array<number>;
  weeklyInterval?: number;
  monthlyInterval?: number;
  monthlyBy?: MonthlyBy;
  monthlyMonth?: number;
  monthlyMonthDay?: number;
  monthlySetPosition?: number;
  monthlySelectedDays?: Array<number>;
  yearlyBy?: MonthlyBy;
  yearlyMonthDay?: number;
  yearlySetPosition?: number;
  yearlySelectedDays?: Array<number>;
  until?: Date | null;
  count?: number | null;
}

export enum MonthlyBy {
  BYMONTHDAY,
  BYSETPOS
}
