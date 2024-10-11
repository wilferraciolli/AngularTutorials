import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from '@angular/material/card';
import { EnabledStateChange } from './state-change.animation';

@Component({
  selector: 'app-state-change',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCard,
    MatCardTitleGroup,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatButton
  ],
  animations: [
    EnabledStateChange
  ],
  templateUrl: './state-change.component.html',
  styleUrl: './state-change.component.scss'
})
export class StateChangeComponent {
  public longText: string = 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting';

  isEnabled: boolean = true;
  currentState: 'default' | 'half-disabled' | 'disabled' = 'default';

  toggleIsEnabled(): void {
    this.isEnabled = !this.isEnabled;
  }

  public toggleState(state: 'default' | 'half-disabled' | 'disabled'): void {
    this.currentState = state;

  }
}
