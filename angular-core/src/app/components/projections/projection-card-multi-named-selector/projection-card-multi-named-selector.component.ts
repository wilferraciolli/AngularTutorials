import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';

@Component({
  selector: 'app-projection-card-multi-named-selector',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader
  ],
  templateUrl: './projection-card-multi-named-selector.component.html',
  styleUrl: './projection-card-multi-named-selector.component.scss'
})
export class ProjectionCardMultiNamedSelectorComponent {

}
