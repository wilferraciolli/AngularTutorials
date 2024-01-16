import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, ProductDetailComponent, AsyncPipe]
})
export class ProductListComponent {

  public pageTitle: string = 'Products';
  public errorMessage: string = '';

  private productService: ProductService = inject(ProductService);

  // get the observable from the server
  public readonly products$: Observable<Product[]> = this.productService.products$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  public readonly selectedProductId$: Observable<number | undefined> = this.productService.productSelected$;

  public onSelected(productId: number): void {
    // add state to the service when the user selects a product
    this.productService.productSelected(productId);
  }
}
