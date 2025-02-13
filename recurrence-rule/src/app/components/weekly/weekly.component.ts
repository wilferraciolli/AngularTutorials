import { Component, signal, WritableSignal } from '@angular/core';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'wt-weekly',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatAnchor
  ],
  templateUrl: './weekly.component.html',
  styleUrl: './weekly.component.scss'
})
export class WeeklyComponent {
  public rRuleValue: WritableSignal<string> = signal('FREQ=WEEKLY;WKST=MO;BYDAY=SU,MO,TU;INTERVAL=1;UNTIL=20241218T000000Z');

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
    console.log(event.target.value);
    this.rRuleValue.set('event.target.value');
  }
}
