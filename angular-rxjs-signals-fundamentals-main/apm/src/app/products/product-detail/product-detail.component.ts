import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { CartService } from '../../cart/cart.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe, AsyncPipe]
})
export class ProductDetailComponent {

  private productService: ProductService = inject(ProductService);
  private cartService: CartService = inject(CartService);

  public errorMessage: string = '';
  public readonly product$: Observable<Product> = this.productService.product$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  // public pageTitle: string = this.product ? `Product Detail for: ${ this.product.productName }` : 'Product Detail';
  public pageTitle: string = 'Page title to be changed later';

  public addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
