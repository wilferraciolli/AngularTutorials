import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { animate, spring } from 'motion';

@Component({
  selector: 'app-simple-motion',
  standalone: true,
  imports: [CommonModule, MatDivider, MatCardModule, MatButton],
  templateUrl: './simple-motion.component.html',
  styleUrl: './simple-motion.component.scss'
})
export class SimpleMotionComponent implements OnInit {
  @ViewChild('myElement')
  public myElement: ElementRef | undefined = undefined;

  @ViewChild('myCard')
  public myCard: ElementRef | undefined = undefined;

  public ngOnInit(): void {
  }

  public rotateMyElement(): void {
    console.log('Handling click ');
    if (this.myElement) {
      animate(
        this.myElement.nativeElement,
        { rotate: 180 },
        { duration: 0.5, easing: 'ease-in' }
      ).finished.then(() => {
        // animation completed
      }).catch(() => {
        // if an error happens
      });
    } else {
      console.log('Cant find element');
    }
  }

  public spinMyCard(): void {
    console.log('Handling click ');
    if (this.myCard) {
      animate(
        this.myCard.nativeElement,
        { rotate: 180 },
        { duration: 0.5, easing: spring() }
      ).finished.then(() => {
        // animation completed
      }).catch(() => {
        // if an error happens
      });
    } else {
      console.log('Cant find element');
    }
  }
}
