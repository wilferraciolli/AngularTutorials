import { Component } from '@angular/core';
import {CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent {
  all: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  even: number[] = [10];
  new: number[] = [20];

  allColumnsConnected: string[] = ['new', 'even'];
  evenColumnsConnected: string[] = ['all', 'new'];
  newColumnsConnected: string[] = ['all', 'even'];

  /**
   * This is a function that handles when an event is dropped.
   * This can be used to save the new state
   * @param event the event that was moved
   */
  drop(event: CdkDragDrop<number[]>): void {
    console.log('The event moved is ', event );

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

  /** Predicate function that only allows even numbers to be dropped into a list. */
  evenPredicate(item: CdkDrag<number>): boolean {
    // return item.data % 2 === 0;
    return true;
  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  noReturnPredicate(): boolean {
    // return false;
    return true;
  }

}
