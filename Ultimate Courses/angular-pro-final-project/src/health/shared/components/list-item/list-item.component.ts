import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['list-item.component.scss'],
  template: `
    <div class="list-item">
      <!--      {{ item | json }}-->
      <a [routerLink]="getRoute(item)">

        <p class="list-item__name">{{ item.name }}</p>
        <p class="list-item__ingredients">
          <span>{{ item.ingredients }}</span>
        </p>
      </a>

      <!-- Delete action with confirm -->
      <div class="list-item__delete"
           *ngIf="toggled">
        <p>Delete item?</p>
        <button type="button"
                class="confirm"
                (click)="removeItem()">
          Yes
        </button>
        <button type="button"
                class="cancel"
                (click)="toggle()">
          No
        </button>
      </div>
      <button class="trash"
              type="button"
              (click)="toggle()">
        <img src="/img/remove.svg">
      </button>
    </div>
  `
})
export class ListItemComponent {

  @Input()
  item: any;

  @Output()
  remove = new EventEmitter<any>();

  toggled = false;

  public getRoute(item: any) {
    // dynamically build the route to navigate to
    return [`../meals`, item.$key];
  }

  public removeItem() {
    this.remove.emit(this.item);
  }

  public toggle() {
    this.toggled = !this.toggled;
  }
}
