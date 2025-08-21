import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { ProjectionCardComponent } from '../projection-card/projection-card.component';

@Component({
  selector: 'app-projection',
  standalone: true,
  imports: [

    MatCheckbox,
    FormsModule,
    ProjectionCardComponent
  ],
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
