import { Component } from '@angular/core';
import { StateChangeComponent } from '../../state-change/state-change.component';

@Component({
  selector: 'app-animation-list',
  standalone: true,
  imports: [
    StateChangeComponent
  ],
  templateUrl: './animation-list.component.html',
  styleUrl: './animation-list.component.scss'
})
export class AnimationListComponent {

}
