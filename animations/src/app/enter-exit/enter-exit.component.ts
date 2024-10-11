import { NgIf } from '@angular/common';
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
import { EnterExit } from './enter-exit.animation';

@Component({
  selector: 'app-enter-exit',
  standalone: true,
  imports: [
    NgIf,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatCardTitleGroup,
    MatButton
  ],
  animations: [EnterExit],
  templateUrl: './enter-exit.component.html',
  styleUrl: './enter-exit.component.scss'
})
export class EnterExitComponent {
  public longText: string = 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting';

  cardIsDisplayed = true;

  toggleCard(): void {
    this.cardIsDisplayed = !this.cardIsDisplayed;
  }
}
