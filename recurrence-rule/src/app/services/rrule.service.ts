import { Injectable } from '@angular/core';
import { datetime, Options, RRule } from 'rrule';
import moment from 'moment';

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
    // default user friendly text rule.toText();

    return rule.toText();
  }
}
