import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { QueryShake } from './query-shake.animation';

@Component({
  selector: 'app-query-shake',
  standalone: true,
  imports: [
    NgForOf
  ],
  animations: [QueryShake],
  templateUrl: './query-shake.component.html',
  styleUrl: './query-shake.component.scss'
})
export class QueryShakeComponent {
  animation: 'default' | 'withLimit' | null = null;

  animate(): void {
    this.animation = 'default';
  }

  animateWithLimit(): void {
    this.animation = 'withLimit';
  }

  animationDone(): void {
    this.animation = null;
  }
}
