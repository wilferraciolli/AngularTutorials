import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl: string = 'api/products';

  private http: HttpClient = inject(HttpClient);

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      tap(() => console.log('Calling products '))
    );
  }

  public getProduct(id: number): Observable<Product> {
    const productUrl: string = this.productsUrl +'/' + id;

    return this.http.get<Product>(productUrl).pipe(
      tap(() => console.log('Calling product by id '))
    );
  }
}
