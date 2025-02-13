import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RruleService } from '../../services/rrule.service';

@Component({
  selector: 'wt-monthly',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatChipSet,
    MatChip,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle
  ],
  templateUrl: './monthly.component.html',
  styleUrl: './monthly.component.scss'
})
export class MonthlyComponent {
  private readonly _rRuleService: RruleService = inject(RruleService);

  public rRuleValue: WritableSignal<string> = signal('FREQ=MONTHLY;WKST=MO;BYMONTHDAY=3;INTERVAL=1;UNTIL=20241218T000000Z');
  public instances: Signal<Array<string>> = computed(() =>
    this._rRuleService.generateRRuleDates(this.rRuleValue())
  );
  public rRuleDescription: Signal<string> = computed(() =>
    this._rRuleService.generateRRuleDescription(this.rRuleValue())
  );
  public rRuleBAseDescription: Signal<string> = computed(() =>
    this._rRuleService.generateRRuleBaseDescription(this.rRuleValue())
  );
  public firstInstance: Signal<string> = computed(() =>
    this._rRuleService.generateFirstInstance(this.rRuleValue())
  );

  public setValueDayOfTheMonthUntilDate(): void {
    this.rRuleValue.set('FREQ=MONTHLY;WKST=MO;BYMONTHDAY=3;INTERVAL=1;UNTIL=20241218T000000Z');
  }

  public setValueWeekPositionUntilDate(): void {
    this.rRuleValue.set('FREQ=MONTHLY;WKST=MO;BYSETPOS=1;BYDAY=SU;INTERVAL=1;UNTIL=20241218T000000Z');
  }

  public setValueMonthDayWithCount(): void {
    this.rRuleValue.set('FREQ=MONTHLY;WKST=MO;BYMONTHDAY=3;INTERVAL=1;COUNT=5');
  }

  public setValueWeekPositionCount(): void {
    this.rRuleValue.set('FREQ=MONTHLY;WKST=MO;BYSETPOS=-1;BYDAY=SU;INTERVAL=1;COUNT=5');
  }

  public setValueWithInterval(): void {
    this.rRuleValue.set('FREQ=MONTHLY;WKST=MO;BYMONTHDAY=3;INTERVAL=2;COUNT=5');
  }

  public valueChanged(event: any): void {
    this.rRuleValue.set(event.target.value);
  }
}
