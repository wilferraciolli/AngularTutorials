import { Component } from '@angular/core';
import { Store } from './store';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div class="app">
      <div *ngFor="let todo of todos$ | async">
        {{ todo.name }}
      </div>
    </div>
  `
})
export class AppComponent {

  todos$ = this.store.select<any[]>('todos');

  constructor(private store: Store) {
    this.store.set('todos', [{ id: 1, name: 'Dinner' }, { id: 2, name: 'Washing' }]);
    console.log('The current value of store ', store);
  }
}
