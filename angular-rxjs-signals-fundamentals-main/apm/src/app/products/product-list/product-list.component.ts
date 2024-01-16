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

  // Selected product id to highlight the entry
  public selectedProductId: number = 0;

  private productService: ProductService = inject(ProductService);

  public readonly products$: Observable<Product[]> = this.productService.products$.pipe(
    tap(() => console.log('received data')),
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  public onSelected(productId: number): void {
    this.selectedProductId = productId;
  }
}
