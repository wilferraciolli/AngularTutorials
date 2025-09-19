import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { ComponentStoreComponent } from './component-stores/component-store/component-store.component';
import { TodosStore } from './store/todos.store';
import { TodosListComponent } from './todos-list/todos-list.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule, TodosListComponent, MatProgressSpinner, MatTabGroup, MatTab,
    ComponentStoreComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  store = inject(TodosStore);

  public ngOnInit(): void {
    this._loadTodos().then(() => {
      console.log('TODOSsssssss');
    });
  }

  private async _loadTodos(): Promise<void> {
    await this.store.loadAll();
  }
}
