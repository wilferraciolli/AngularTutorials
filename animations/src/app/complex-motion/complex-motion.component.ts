import { Component, ElementRef, ViewChild } from '@angular/core';
import { animate, spring, timeline, Easing, EasingGenerator } from 'motion';

@Component({
  selector: 'app-complex-motion',
  standalone: true,
  imports: [],
  templateUrl: './complex-motion.component.html',
  styleUrl: './complex-motion.component.scss'
})
export class ComplexMotionComponent {
  @ViewChild('box') box!: ElementRef;
  isAnimating = false;

  animateDefaultCard(): void {
    this._animateCard('ease-in-out');
  }

  animateSpringCard(): void {
    this._animateCard(spring());
  }

  animateSequenceCard(): void {
    this.isAnimating = true;
    const sequence = [
      [this.box.nativeElement, { x: 100 }, { duration: 0.5 }],
      [this.box.nativeElement, { y: 100 }, { duration: 0.5 }],
      [this.box.nativeElement, { x: 0, y: 0 }, { duration: 1 }],
    ];
    timeline(sequence as any)
    .finished.then(() => {
      this.isAnimating = false;
    })
    .catch(() => {
      this.isAnimating = false;
    });
  }

  private _animateCard(easing: Easing | EasingGenerator): void {
    this.isAnimating = true;
    animate(this.box.nativeElement, { rotate: 180 }, { duration: 0.5, easing })
    .finished.then(() => {
      animate(
        this.box.nativeElement,
        { rotate: 0 },
        { duration: 0.5, easing }
      )
      .finished.then(() => {
        this.isAnimating = false;
      })
      .catch(() => {
        this.isAnimating = false;
      });
    })
    .catch(() => {
      this.box.nativeElement.rotate = 0;
      this.isAnimating = false;
    });
  }
}
