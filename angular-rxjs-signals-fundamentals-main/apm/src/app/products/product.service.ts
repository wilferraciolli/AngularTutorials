import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { HttpErrorService } from '../utilities/http-error.service';
import { Product } from './product';
import { ProductData } from './product-data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl: string = 'api/products';

  private http: HttpClient = inject(HttpClient);
  private errorService: HttpErrorService = inject(HttpErrorService);

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      tap(() => console.log('Calling products ')),
      catchError((error) => this.handleError(error))
    );
  }

  public getProduct(id: number): Observable<Product> {
    const productUrl: string = this.productsUrl + '/' + id;

    return this.http.get<Product>(productUrl).pipe(
      tap(() => console.log('Calling product by id ')),
      catchError((error) => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const formattedMessage: string = this.errorService.formatError(error);

    return throwError(() => formattedMessage);
  }
}
