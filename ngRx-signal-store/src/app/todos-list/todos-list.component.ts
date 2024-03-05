import { NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { TodosStore } from '../store/todos.store';

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

  store = inject(TodosStore);

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
}
