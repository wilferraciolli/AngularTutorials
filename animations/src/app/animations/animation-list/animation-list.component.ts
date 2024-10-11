import { Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { ChildrenAnimationComponent } from '../../children-animation/children-animation.component';
import { ComplexMotionComponent } from '../../complex-motion/complex-motion.component';
import { EnterExitComponent } from '../../enter-exit/enter-exit.component';
import { StateChangeComponent } from '../../state-change/state-change.component';

@Component({
  selector: 'app-animation-list',
  standalone: true,
  imports: [
    StateChangeComponent,
    MatDivider,
    EnterExitComponent,
    ComplexMotionComponent,
    ChildrenAnimationComponent
  ],
  templateUrl: './animation-list.component.html',
  styleUrl: './animation-list.component.scss'
})
export class AnimationListComponent {

}
