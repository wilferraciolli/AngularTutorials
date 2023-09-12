import { Injectable } from '@angular/core';
import { Food } from './interfaces/food';
import { Person } from './interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class StorageManagerService {

  public testStorage(): void {
    this._checkLocalStorageIsAvailable();

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
  public _addValueToLocalStorage<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // get an object from local storage and specify type
  public _getValueFromLocalStorage<T>(key: string): T | null {
    const value: string | null = localStorage.getItem(key);

    if (value) {
      return JSON.parse(value);
    }

    return null;
  }

  public _removeItemFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  public _emptyLocalStorage(): void {
    setTimeout(() => localStorage.clear(), 4000);
  }

  // add an object to session storage and specify type
  public _addValueToSessionStorage<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  // get an object from session storage and specify type
  public _getValueFromSessionStorage<T>(key: string): T | null {
    const value: string | null = sessionStorage.getItem(key);

    if (value) {
      return JSON.parse(value);
    }

    return null;
  }

  public _checkLocalStorageIsAvailable(): void {
    // both local and session storage are the same object
    // console.log(window.localStorage);  // Storage object that is always present on the browser
    // console.log(window.sessionStorage); // Storage object that will live on the browser until the browser is closed

    // check that local storage is available
    console.log(!!(typeof Storage === 'function' && localStorage));
  }
}
