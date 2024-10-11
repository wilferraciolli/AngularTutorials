import { Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { EnterExitComponent } from '../../enter-exit/enter-exit.component';
import { StateChangeComponent } from '../../state-change/state-change.component';

@Component({
  selector: 'app-animation-list',
  standalone: true,
  imports: [
    StateChangeComponent,
    MatDivider,
    EnterExitComponent
  ],
  templateUrl: './animation-list.component.html',
  styleUrl: './animation-list.component.scss'
})
export class AnimationListComponent {

}
