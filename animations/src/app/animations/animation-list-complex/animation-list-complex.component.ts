import { Component } from '@angular/core';
import { QueryShakeComponent } from '../../query-shake/query-shake.component';

@Component({
  selector: 'app-animation-list-complex',
  standalone: true,
  imports: [
    QueryShakeComponent
  ],
  templateUrl: './animation-list-complex.component.html',
  styleUrl: './animation-list-complex.component.scss'
})
export class AnimationListComplexComponent {

}
