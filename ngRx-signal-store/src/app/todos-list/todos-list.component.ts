import { NgStyle } from '@angular/common';
import { Component, effect, inject, Signal, viewChild } from '@angular/core';
import { MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { TodosFilter, TodosStore } from '../store/todos.store';

@Component({
  selector: 'todos-list',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatIcon,
    MatLabel,
    MatSuffix,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatSelectionList,
    MatListOption,
    NgStyle
  ],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})
export class TodosListComponent {

  public store = inject(TodosStore);

  public matFilter: Signal<MatButtonToggleGroup> = viewChild.required(MatButtonToggleGroup);

  constructor() {
    // create an effect to deal with filters, it will take user input and assign to the store
    effect(() => {
      const filter: MatButtonToggleGroup = this.matFilter();
      console.log('assigning the filter value ', this.store.filter());


      // assign the value oif the filter signal from the store to the selected value on the toggles
      filter.value = this.store.filter();
    });
  }

  public async onAddTodo(title: string): Promise<void> {
    await this.store.addTodo(title);
  }

  public async onDeleteTodo(id: string, event: MouseEvent): Promise<void> {
    event.stopPropagation();

    await this.store.deleteTodo(id);
  }

  public async onTodoToggled(id: string, completed: boolean): Promise<void> {
    await this.store.updateTodo(id, completed);
  }

  public onFilterTodos(event: MatButtonToggleChange): void {
    const filter: TodosFilter = event.value as TodosFilter;

    this.store.updateFilter(filter);
  }
}
