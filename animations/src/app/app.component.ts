import { Component, OnInit } from '@angular/core';
import { MatTab, MatTabContent, MatTabGroup } from '@angular/material/tabs';
import { RouterOutlet } from '@angular/router';
import { AnimationListComplexComponent } from './animations/animation-list-complex/animation-list-complex.component';
import { AnimationListComponent } from './animations/animation-list/animation-list.component';
import { ComplexMotionComponent } from './complex-motion/complex-motion.component';
import { FadeInCardComponent } from './fade-in-card/fade-in-card.component';
import { SimpleMotionComponent } from './simple-motion/simple-motion.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, SimpleMotionComponent, FadeInCardComponent, MatTabGroup, MatTab, MatTabContent,
    AnimationListComponent, ComplexMotionComponent, AnimationListComplexComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'animations';

  public ngOnInit(): void {
  }
}
