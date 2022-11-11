import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class FoodService {
  // api = '/api/pizzas';

  constructor(
    private http: Http,
    private api: string
  ) {
  }

  getFood(): Observable<any[]> {
    return this.http.get(this.api)
               .map(response => response.json());
  }

  getSides(): Observable<any[]> {
    return this.http.get('/api/sides')
               .map(response => response.json());
  }
  getPizzas(): Observable<any[]> {
    return this.http.get('/api/pizzas')
               .map(response => response.json());
  }
  getDrinks(): Observable<any[]> {
    return this.http.get('/api/drinks')
               .map(response => response.json());
  }
}
