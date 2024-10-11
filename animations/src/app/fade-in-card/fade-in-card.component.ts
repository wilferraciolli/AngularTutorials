import { animate, style, transition, trigger } from '@angular/animations';
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
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-fade-in-card',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatCardTitleGroup,
    MatDivider
  ],
  animations: [
    trigger('fadeIn', [
      transition('void=>*', [
        style({ opacity: 0 }),
        animate('3200ms', style({ opacity: 1 }))
      ])
    ])
  ],
  templateUrl: './fade-in-card.component.html',
  styleUrl: './fade-in-card.component.scss'
})
export class FadeInCardComponent {

}
