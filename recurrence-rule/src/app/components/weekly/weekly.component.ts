import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RruleService } from '../../services/rrule.service';

@Component({
  selector: 'wt-weekly',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatChipSet,
    MatChip
  ],
  templateUrl: './weekly.component.html',
  styleUrl: './weekly.component.scss'
})
export class WeeklyComponent {
  private readonly _rRuleService: RruleService = inject(RruleService);

  public rRuleValue: WritableSignal<string> = signal('FREQ=WEEKLY;WKST=MO;BYDAY=SU,MO,TU;INTERVAL=1;UNTIL=20241218T000000Z');
  public instances: Signal<Array<string>> = computed(() =>
     this._rRuleService.generateRRuleDates(this.rRuleValue())
  );
  public rRuleDescription: Signal<string> = computed(() =>
    this._rRuleService.generateRRuleDescription(this.rRuleValue())
  );

  public setValueSingleDayEndDate(): void {
    this.rRuleValue.set('FREQ=WEEKLY;WKST=MO;BYDAY=MO;INTERVAL=1;UNTIL=20241218T000000Z');
  }

  public setValueMultipleDayEndDate(): void {
    this.rRuleValue.set('FREQ=WEEKLY;WKST=MO;BYDAY=SU,MO,TU;INTERVAL=1;UNTIL=20241218T000000Z');
  }

  public setValueSingleDayCount(): void {
    this.rRuleValue.set('FREQ=WEEKLY;WKST=MO;BYDAY=MO,TU;INTERVAL=1;COUNT=5');
  }

  public setValueMultipleDayCount(): void {
    this.rRuleValue.set('FREQ=WEEKLY;WKST=MO;BYDAY=SU,MO,TU;INTERVAL=1;COUNT=5');
  }

  public valueChanged(event: any): void {
    this.rRuleValue.set(event.target.value);
  }

  private _updateRRuleValues(): void {
  }
}
