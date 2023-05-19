import {Component, Input} from '@angular/core';
import {BoardItem} from "./board-item";

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss']
})
export class BoardItemComponent {
  @Input()
  public boardItem!: BoardItem;

  public editBoardItem(): void {
    console.log('Board item clicked')
  }
}
