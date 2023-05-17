import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.scss']
})
export class BoardDetailsComponent {
  incomingItems: string[] = ['Carrots', 'Tomatoes', 'Onions', 'Apples', 'Avocados'];

  availableItems: string[] = ['Oranges', 'Bananas', 'Cucumbers', 'Try to move me'];

  soldItems: string[] = ['Pears', 'Strawberries', 'Limes', 'Mangoes'];
  signOffItems: string[] = ['Pears'];
  doneItems: string[] = [];

  items = [
    {value: 'Oranges', disabled: false},
    {value: 'Bananas', disabled: true},
    {value: 'Mangoes', disabled: false},
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
