import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {

  public ngOnInit(): void {
    this._checkLocalStorageIsAvailable();

    localStorage.setItem('cookies', 'true');
    localStorage.getItem('cookies');

    // add to storage passing types
    this._addValueToLocalStorage<Person>('person', { id: 1, name: 'John', surname: 'Doe' } as Person);
    this._addValueToLocalStorage<Food>('food', { id: 1, title: 'Burger' } as Food);

    // get from storage passing types
    const person: Person | null = this._getValueFromLocalStorage<Person>('person');
    const food: Food | null = this._getValueFromLocalStorage<Food>('food');

    console.log(person);
    console.log(food);

    this._removeItemFromLocalStorage('person');
    this._emptyLocalStorage();
  }

  // add an object to local storage and specify type
  private _addValueToLocalStorage<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // get an object from local storage and specify type
  private _getValueFromLocalStorage<T>(key: string): T | null {
    const value: string | null = localStorage.getItem(key);

    if (value) {
      return JSON.parse(value);
    }

    return null;
  }

  private _removeItemFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  private _emptyLocalStorage(): void {
    setTimeout(() => localStorage.clear(), 4000);
  }

  private _checkLocalStorageIsAvailable(): void {
    // both local and session storage are the same object
    // console.log(window.localStorage);  // Storage object that is always present on the browser
    // console.log(window.sessionStorage); // Storage object that will live on the browser until the browser is closed

    // check that local storage is available
    console.log(!!(typeof Storage === 'function' && localStorage));
  }
}

export interface Person {
  id: number;
  name: string;
  surname: string;
}

export interface Food {
  id: number;
  title: string;
}
