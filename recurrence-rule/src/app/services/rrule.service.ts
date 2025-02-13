import { Injectable } from '@angular/core';
import moment from 'moment';
import { datetime, Frequency, Options, RRule } from 'rrule';

@Injectable({
  providedIn: 'root'
})
export class RruleService {
  constructor() {
  }

  public generateRRule(rrule: string): RRule {
    const options: Partial<Options> = RRule.parseString(rrule);
    options.dtstart = datetime(2024, 1, 1, 10, 30);

    return new RRule(options);
  }

  public generateRRuleDates(rrule: string): Array<string> {
    // console.log('RRUle received', rrule);
    const rule: RRule = this.generateRRule(rrule);

    const dates: Array<string> = rule.all().map((date: Date) =>
      moment(date).format('YYYY-MM-DD HH:mm'));

    return dates;
  }

  public generateRRuleDescription(rrule: string): string {
    const rule: RRule = this.generateRRule(rrule);
    // default user friendly text
    // return rule.toText();

    const data: IRecurrenceData = this._generateData(rule);
    console.log('DATA ', data);
    // TODO build text

    if (data.frequency === Frequency.WEEKLY) {
      // @ts-ignore
      const weekDays: string = data.weeklySelectedDays.map((day: number) => moment().day(day).format('dddd'))
                                   .join(', ');
      const interval: number = data.weeklyInterval || 1;
      const count: number = data.count || 0;

      if (count > 0) {
        // with count
        if (interval > 1) {
          return `Occurs on ${ weekDays } of every ${ interval } weeks effective from 26/10/2024 for ${count} check-ins from 09:00 to 09: 30`;
        } else {
          return `Occurs on ${ weekDays } of every week effective from 26/10/2024 for ${count} check-ins from 09:00 to 09: 30`;
        }
      } else {
        // with until date
        if (interval > 1) {
          return `Occurs on ${ weekDays } of every ${ interval } weeks effective from 26/10/2024 until 26/10/2025 from 09:00 to 09: 30`;
        } else {
          return `Occurs on ${ weekDays } of every week effective from 26/10/2024 until 26/10/2025 from 09:00 to 09: 30`;
        }
      }
    }
    return 'todo';
  }

  private _generateData(rule: RRule): IRecurrenceData {

    return {
      frequency: rule.options.freq,

      weeklySelectedDays: rule.options.byweekday.map((day) => day + 1),
      weeklyInterval: rule.options.interval,

      monthlyInterval: rule.options.interval,
      monthlyBy: rule.options.bymonth?.[0],
      monthlyMonth: rule.options.bymonth?.[0],
      monthlyMonthDay: rule.options.bymonthday?.[0],
      monthlySetPosition: rule.options.bysetpos?.[0],
      monthlySelectedDays: rule.options.bynmonthday,

      yearlyBy: rule.options.bymonth?.[0],
      yearlyMonthDay: rule.options.bymonthday?.[0],
      yearlySetPosition: rule.options.bysetpos?.[0],
      yearlySelectedDays: rule.options.byyearday,

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

export const MonthlyByFieldValues: Array<MonthlyBy> = [MonthlyBy.BYMONTHDAY, MonthlyBy.BYSETPOS];
export const RecurrenceMonthlyByLabels: Record<MonthlyBy, string> = {
  [MonthlyBy.BYMONTHDAY]: 'byMonthDay',
  [MonthlyBy.BYSETPOS]: 'bySetPos'
};
