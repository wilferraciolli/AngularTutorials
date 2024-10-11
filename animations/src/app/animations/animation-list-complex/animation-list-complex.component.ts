import { Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { QueryShakeComponent } from '../../query-shake/query-shake.component';
import { SequenceKeyframeComponent } from '../../sequence-keyframe/sequence-keyframe.component';
import { SingleShakeComponent } from '../../single-shake/single-shake.component';

@Component({
  selector: 'app-animation-list-complex',
  standalone: true,
  imports: [
    QueryShakeComponent,
    MatDivider,
    SequenceKeyframeComponent,
    SingleShakeComponent
  ],
  templateUrl: './animation-list-complex.component.html',
  styleUrl: './animation-list-complex.component.scss'
})
export class AnimationListComplexComponent {

}
