import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Item } from '../models/item.interface';
import { Product } from '../models/prouct.interface';

// because we are using webpack to manage a DBServer, then we can make calls to get data from the file
@Injectable()
export class StockInventoryService {

  constructor(private http: Http) {
  }

  getCartItems(): Observable<Item[]> {
    return this.http.get('/api/cart')
               .map((response: Response) => response.json())
               .catch((error: any) => Observable.throw(error.json()));
  }

  getProducts(): Observable<Product[]> {
    return this.http.get('/api/products')
               .map((response: Response) => response.json())
               .catch((error: any) => Observable.throw(error.json()));
  }

  checkBranchId(id: string): Observable<boolean> {
    let search = new URLSearchParams();
    search.set('id', id);

    return this.http.get('/api/branches', { search })
               .map((response: Response) => response.json())
               .map((response: any[]) => !!response.length)
               .catch((error: any) => Observable.throw(error.json()));
  }

}
