import { Component } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from '@angular/material/card';
import { PulseAnimation } from './single-shake.animation';

@Component({
  selector: 'app-single-shake',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatCardTitleGroup
  ],
  animations: [PulseAnimation],
  templateUrl: './single-shake.component.html',
  styleUrl: './single-shake.component.scss'
})
export class SingleShakeComponent {
  isAnimating = false;
  isDisabled = false;

  toggleIsDisabled(): void {
    this.isDisabled = !this.isDisabled;
  }

  playAnimation(): void {
    this.isAnimating = true;
  }

  animationDone(): void {
    this.isAnimating = false;
  }
}
