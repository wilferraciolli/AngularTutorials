import { Injectable } from '@angular/core';
import { TODOS } from '../models/mock-datal';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  public async getTodos(): Promise<Todo[]> {
    await sleep(1000);
    return TODOS;
  }
}

// dummy function to make the code delay mimicing calling an api
async function sleep(number: number) {
  return new Promise((resolve) => setTimeout(resolve, number));
}
