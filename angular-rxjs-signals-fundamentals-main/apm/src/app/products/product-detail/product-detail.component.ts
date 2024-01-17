import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, Signal } from '@angular/core';
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

  public product: Signal<Product | undefined> = this.productService.product;
  public errorMessage: Signal<string | undefined> = this.productService.productError;

  public pageTitle: Signal<string> = computed(() =>{
    const product: Product | undefined = this.product();

    return product ?
      `Product detail for: ${ product.productName }` :
      'Product detail';
  }
  );

  public addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
