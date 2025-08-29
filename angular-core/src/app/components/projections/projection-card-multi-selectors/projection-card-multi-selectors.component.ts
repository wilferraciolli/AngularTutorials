import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';

@Component({
  selector: 'app-projection-card-multi-selectors',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader
  ],
  templateUrl: './projection-card-multi-selectors.component.html',
  styleUrl: './projection-card-multi-selectors.component.scss'
})
export class ProjectionCardMultiSelectorsComponent {

}
