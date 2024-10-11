import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Container, EnterExitLeft, EnterExitRight } from './children.animation';

@Component({
  selector: 'app-children-animation',
  standalone: true,
  imports: [
    NgIf
  ],
  animations: [Container, EnterExitLeft, EnterExitRight],
  templateUrl: './children-animation.component.html',
  styleUrl: './children-animation.component.scss'
})
export class ChildrenAnimationComponent {
  isDisplayed = true;

  toggleIsDisplayed(): void {
    this.isDisplayed = !this.isDisplayed;
  }
}
