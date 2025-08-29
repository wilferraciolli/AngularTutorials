import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDivider } from '@angular/material/divider';
import {
  ProjectionCardMultiNamedSelectorComponent
} from '../projection-card-multi-named-selector/projection-card-multi-named-selector.component';
import {
  ProjectionCardMultiSelectorsComponent
} from '../projection-card-multi-selectors/projection-card-multi-selectors.component';
import { ProjectionCardComponent } from '../projection-card/projection-card.component';

@Component({
  selector: 'app-projection',
  standalone: true,
  imports: [

    MatCheckbox,
    FormsModule,
    ProjectionCardComponent,
    ProjectionCardMultiSelectorsComponent,
    MatDivider,
    ProjectionCardMultiNamedSelectorComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './projection.component.html',
  styleUrl: './projection.component.scss'
})
export class ProjectionComponent {
  // public disableClickableHeader: WritableSignal<boolean> = signal<boolean>(false);
  public disableClickableHeader: boolean = false;

  public toggledValue(event: boolean): void {
    this.disableClickableHeader = event;
  }
}
