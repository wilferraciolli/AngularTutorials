import {Component, Input} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {BoardItem} from "../board-item/board-item";

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.scss']
})
export class BoardDetailsComponent {
  @Input()
  public toDoItems?: BoardItem[];
  @Input()
  public doingItems?: BoardItem[];
  @Input()
  public testingItems?: BoardItem[];
  @Input()
  public singOffItems?: BoardItem[];
  @Input()
  public doneItems?: BoardItem[];

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

  // dropItem(event: CdkDragDrop<BoardItem[], any>): void {
  //   console.log('Item dropped ', event);
  //
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex,
  //     );
  //   }
  // }
  dropItem(event: CdkDragDrop<BoardItem[] | undefined, any>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray((event.container.data) as BoardItem[], event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data as BoardItem[],
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
