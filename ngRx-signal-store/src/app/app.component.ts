import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterOutlet } from '@angular/router';
import { TodosStore } from './store/todos.store';
import { TodosListComponent } from './todos-list/todos-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TodosListComponent, MatProgressSpinner],
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
