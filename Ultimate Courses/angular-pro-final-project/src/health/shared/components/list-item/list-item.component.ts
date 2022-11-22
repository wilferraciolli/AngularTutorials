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
          <span *ngIf="item.ingredients; else showWorkout">
            {{ item.ingredients | join }}
          </span>
        </p>
        <ng-template #showWorkout>
          <span>{{ item | workout }}</span>
        </ng-template>
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
    // dynamically build the route to navigate to, based on the key and whether it is a meal
    return [`../${ item.ingredients ? 'meals' : 'workouts' }`, item.$key];
  }

  public removeItem() {
    this.remove.emit(this.item);
  }

  public toggle() {
    this.toggled = !this.toggled;
  }
}
