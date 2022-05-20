import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product, ProductResolved } from './product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<ProductResolved> {

  constructor(private productService: ProductService) {
  }

  // the resolver takes 2 params
  // activatedRouterSnapshot which is used to get route params and
  // RouterStateSnapshot which is a tree of activated routers
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved> {

    // get the id of the product from the current route
    const id = route.paramMap.get('id');

    if (isNaN(+id)) {
      const message = `Product id was not a number: ${id}`;
      console.error(message);

      // handle error here
      return of({ product: null, error: message });
    }

    return this.productService.getProduct(+id)
      .pipe(
        map(product => ({ product: product })),
        catchError(error => {
          const message = `Retrieval error: ${error}`;
          console.error(message);

          return of({ product: null, error: message });
        })
      );
  }

}
