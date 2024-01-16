import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, shareReplay, switchMap, tap, throwError } from 'rxjs';
import { Review } from '../reviews/review';
import { ReviewService } from '../reviews/review.service';
import { HttpErrorService } from '../utilities/http-error.service';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl: string = 'api/products';

  private http: HttpClient = inject(HttpClient);
  private errorService: HttpErrorService = inject(HttpErrorService);
  private reviewService: ReviewService = inject(ReviewService);

  public readonly products$: Observable<Product[]> = this.http.get<Product[]>(this.productsUrl).pipe(
    tap((p: Product[]) => console.log(JSON.stringify(p))),
    shareReplay(1),
    catchError((error) => this.handleError(error))
  );

  // define a selected product id Behaviour subject as private as only this service is allowed to write to it
  private productSelectedSubject: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(undefined);

  // expose the product selected as Observable so people can get its value
  public readonly productSelected$: Observable<number | undefined> = this.productSelectedSubject.asObservable();

  public getProduct(id: number): Observable<Product> {
    const productUrl: string = this.productsUrl + '/' + id;

    return this.http.get<Product>(productUrl).pipe(
      tap(() => console.log('Calling product by id ')),
      switchMap((product: Product) => this.getProductWithReviews(product)),
      catchError((error) => this.handleError(error))
    );
  }

  // emmit a new value to the product selected id
  public productSelected(selectedProductId: number): void {
    this.productSelectedSubject.next(selectedProductId);
  }

  private getProductWithReviews(product: Product): Observable<Product> {
    // if product has reviews, then fetch it and add to the product
    if (product.hasReviews) {
      return this.http.get<Review[]>(this.reviewService.getReviewUrl(product.id))
                 .pipe(
                   map((reviews: Review[]) => ({ ...product, reviews } as Product))
                 );
    } else {
      return of(product);
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const formattedMessage: string = this.errorService.formatError(error);

    return throwError(() => formattedMessage);
  }
}
