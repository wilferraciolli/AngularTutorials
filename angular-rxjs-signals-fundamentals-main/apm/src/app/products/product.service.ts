import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  catchError,
  filter,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  tap,
  throwError
} from 'rxjs';
import { Review } from '../reviews/review';
import { ReviewService } from '../reviews/review.service';
import { HttpErrorService } from '../utilities/http-error.service';
import { Result } from '../utilities/result';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl: string = 'api/products';

  private http: HttpClient = inject(HttpClient);
  private errorService: HttpErrorService = inject(HttpErrorService);
  private reviewService: ReviewService = inject(ReviewService);

  // map response onto an observable with result status when error occurs
  private productsResult$: Observable<Result<Product[]>> = this.http.get<Product[]>(this.productsUrl).pipe(
    map((p: Product[]) => ({ data: p } as Result<Product[]>)),
    tap((p: Result<Product[]>) => console.log(JSON.stringify(p))),
    shareReplay(1),
    catchError((error) => of({
        data: [],
        error: this.errorService.formatError(error)
      } as Result<Product[]>)
    )
  );

  // create a read only signal from observable
  private readonly productsResult: Signal<Result<Product[]>> = toSignal(this.productsResult$,
    { initialValue: ({ data: [] } as Result<Product[]>) });

  // expose values so other components can get a list of both products and when there are errors
  public products: Signal<Product[] | undefined> = computed(() => this.productsResult().data);
  public productsError: Signal<string | undefined> = computed(() => this.productsResult().error);

  // define a selected product id Behaviour subject as private as only this service is allowed to write to it
  private productSelectedSubject: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(undefined);
  // expose the product selected as Observable so people can get its value
  public readonly productSelected$: Observable<number | undefined> = this.productSelectedSubject.asObservable();
  public selectedProductId: WritableSignal<number | undefined> = signal(undefined);

  // react to changes on the selected product changes so we can fetch the correct product upon selection
  public readonly product$: Observable<Product> = this.productSelected$.pipe(
    filter(Boolean),// ignore when the input is null or undefined
    switchMap((id: number) => {
      return this.http.get<Product>(this.productsUrl + '/' + id)
                 .pipe(
                   tap(() => console.log('Calling product by id ')),
                   switchMap((product: Product) => this.getProductWithReviews(product)),
                   catchError((error) => this.handleError(error))
                 );
    })
  );

  // second way to get a product, this way we are getting it from the list rather than a call to the API, this is just a different way then the one above
  // public readonly product1$: Observable<Product> = combineLatest([
  //   this.productSelected$,
  //   this.products$
  // ]).pipe(
  //   // the emitted value is a combination of the first and second obsevable input
  //   map(([selectedProductId, products]: [number | undefined, Product[]]) =>
  //     products.find((product: Product) => product.id === selectedProductId)
  //   ),
  //   filter(Boolean),// ignore when the input is null or undefined
  //   switchMap((product: Product) => this.getProductWithReviews(product)),
  //   catchError((error) => this.handleError(error))
  // );

  // emmit a new value to the product selected id
  public productSelected(selectedProductId: number): void {
    this.productSelectedSubject.next(selectedProductId);
    this.selectedProductId.set(selectedProductId);
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
