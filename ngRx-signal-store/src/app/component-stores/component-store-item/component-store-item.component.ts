import { Component, computed, inject, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TodosStore } from '../../store/todos.store';
import { ComponentItemStore } from '../component-store/component-store.store';

@Component({
  selector: 'component-store-item',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDividerModule],
  providers: [ComponentItemStore],
  templateUrl: './component-store-item.component.html',
  styleUrl: './component-store-item.component.scss'
})
export class ComponentStoreItemComponent {
  private readonly _componentItemStore = inject(ComponentItemStore);
  private readonly _todoStore = inject(TodosStore);

  protected count: Signal<number> = this._componentItemStore.count;
  protected isCountEven: Signal<boolean> = this._componentItemStore.countEven;

  protected completedTodosCount: Signal<number> = this._todoStore.completedTodosCount;

  public onAdd(): void {
    this._componentItemStore.increment();
  }

  public onRemove(): void {
    this._componentItemStore.decrement();
  }

  public onReset(): void {
    this._componentItemStore.reset();
  }
}
