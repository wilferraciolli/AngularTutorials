import { NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-projection-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatIcon,
    NgTemplateOutlet
  ],
  templateUrl: './projection-card.component.html',
  styleUrl: './projection-card.component.scss'
})
export class ProjectionCardComponent implements OnInit, OnChanges {
  @Input()
  public disableClickableHeader: boolean = false;

  @Output()
  public toggledValue: EventEmitter<boolean> = new EventEmitter<boolean>();

  public toggleState(): void {
    this.toggledValue.emit(true);
  }

  // Add debugging
  ngOnInit() {
    console.log('ProjectionCardComponent initialized with disableClickableHeader:', this.disableClickableHeader);
  }

  ngOnChanges() {
    console.log('ProjectionCardComponent disableClickableHeader changed to:', this.disableClickableHeader);
  }

}
