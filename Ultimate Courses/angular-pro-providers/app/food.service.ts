import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class FoodService {
  // api = '/api/pizzas';

  constructor(
    private http: Http,
    // use injector to get the providers value from app module
    @Inject('api') private api: string
  ) {
  }

  getFood(): Observable<any[]> {
    return this.http.get(this.api)
               .map(response => response.json());
  }
}
