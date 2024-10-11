import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-simple-motion',
  standalone: true,
  imports: [CommonModule, MatButton, MatDivider, MatCardModule],
  templateUrl: './simple-motion.component.html',
  styleUrl: './simple-motion.component.scss'
})
export class SimpleMotionComponent implements OnInit {
  @ViewChild('myElement')
  public myElement: ElementRef | undefined = undefined;

  public ngOnInit(): void {
  }

  public animateMyElement(): void {
    console.log('Handling click');


  }
}
