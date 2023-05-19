import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {BoardItem, BoardItemStatusType} from "../board-item/board-item";

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

  public boardItems: BoardItem[] = [
    {id: 'id1', title: 'Title of item 1', description: 'Description of item 1 make the card bigger trying some moremake the card bigger trying some moremake the card bigger trying some more', assignedTo: 'Developer', points: 3, state: 'New'},
    {id: 'id2', title: 'Title of item 2', description: 'Description of item 2 make the card bigger trying some more make the card bigger trying some moremake the card bigger trying some moremake the card bigger trying some more', assignedTo: 'Developer', points: 3, state: 'New'},
    {id: 'id3', title: 'Title of item 3', description: 'Description of item 3 some description to make the card bigger trying some more', assignedTo: 'Developers Name', points: 3, state: 'New'},
    {id: 'id4', title: 'Title of item 1', description: 'Description of item 1 make the card bigger trying some moremake the card bigger trying some moremake the card bigger trying some more', assignedTo: 'Developer', points: 3, state: 'New'},
    {id: 'id5', title: 'Title of item 2', description: 'Description of item 2 make the card bigger trying some more make the card bigger trying some moremake the card bigger trying some moremake the card bigger trying some more', assignedTo: 'Developer', points: 3, state: 'New'},
    {id: 'id6', title: 'Title of item 3', description: 'Description of item 3 some description to make the card bigger trying some more', assignedTo: 'Developers Name', points: 3, state: 'New'},
    {id: 'id7', title: 'Title of item 1', description: 'Description of item 1 make the card bigger trying some moremake the card bigger trying some moremake the card bigger trying some more', assignedTo: 'Developer', points: 3, state: 'New'},
    {id: 'id8', title: 'Title of item 2', description: 'Description of item 2 make the card bigger trying some more make the card bigger trying some moremake the card bigger trying some moremake the card bigger trying some more', assignedTo: 'Developer', points: 3, state: 'New'},
    {id: 'id9', title: 'Title of item 3', description: 'Description of item 3 some description to make the card bigger trying some more', assignedTo: 'Developers Name', points: 3, state: 'New'}
  ];

  items = [
    {value: 'Oranges', disabled: false},
    {value: 'Bananas', disabled: true},
    {value: 'Mangoes', disabled: false},
  ];

  drop(event: CdkDragDrop<string[]>): void {
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

  dropItem(event: CdkDragDrop<BoardItem[], any>): void {
    console.log('Item dropped ', event);

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
