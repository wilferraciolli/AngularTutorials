import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FadeSlideGrowKeyframe } from './sequence-keyframe';

@Component({
  selector: 'app-sequence-keyframe',
  standalone: true,
  imports: [
    NgIf
  ],
  animations: [FadeSlideGrowKeyframe],
  templateUrl: './sequence-keyframe.component.html',
  styleUrl: './sequence-keyframe.component.scss'
})
export class SequenceKeyframeComponent {
  cardIsDisplayed = true;

  toggleCard(): void {
    this.cardIsDisplayed = !this.cardIsDisplayed;
  }
}
