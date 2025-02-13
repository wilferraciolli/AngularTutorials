import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RruleService } from '../../services/rrule.service';

@Component({
  selector: 'wt-yearly',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatChip,
    MatChipSet,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './yearly.component.html',
  styleUrl: './yearly.component.scss'
})
export class YearlyComponent {
  private readonly _rRuleService: RruleService = inject(RruleService);

  public rRuleValue: WritableSignal<string> = signal('FREQ=YEARLY;WKST=MO;BYMONTH=1;BYMONTHDAY=3;UNTIL=20241218T000000Z');
  public instances: Signal<Array<string>> = computed(() =>
    this._rRuleService.generateRRuleDates(this.rRuleValue())
  );
  public rRuleDescription: Signal<string> = computed(() =>
    this._rRuleService.generateRRuleDescription(this.rRuleValue())
  );
  public rRuleBAseDescription: Signal<string> = computed(() =>
    this._rRuleService.generateRRuleBaseDescription(this.rRuleValue())
  );

  public setValueDayOfTheMonthUntilDate(): void {
    this.rRuleValue.set('FREQ=YEARLY;WKST=MO;BYMONTH=1;BYMONTHDAY=3;UNTIL=20241218T000000Z');
  }

  public setValueWeekPositionUntilDate(): void {
    this.rRuleValue.set('FREQ=YEARLY;WKST=MO;BYSETPOS=1;BYDAY=MO;BYMONTH=5;UNTIL=20241218T000000Z');
  }

  public setValueMonthDayWithCount(): void {
    this.rRuleValue.set('FREQ=YEARLY;WKST=MO;BYMONTH=1;BYMONTHDAY=15;COUNT=5');
  }

  public setValueWeekPositionCount(): void {
    this.rRuleValue.set('FREQ=YEARLY;WKST=MO;BYSETPOS=1;BYDAY=TU;BYMONTH=2;COUNT=7');
  }

  public valueChanged(event: any): void {
    this.rRuleValue.set(event.target.value);
  }
}
