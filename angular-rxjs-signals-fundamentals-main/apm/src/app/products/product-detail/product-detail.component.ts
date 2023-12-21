import { Component, inject, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe]
})
export class ProductDetailComponent implements OnChanges, OnDestroy {
  @Input()
  public productId: number = 0;

  public errorMessage: string = '';
  public product: Product | null = null;
  public pageTitle: string = this.product ? `Product Detail for: ${ this.product.productName }` : 'Product Detail';

  private sub!: Subscription;

  private productService: ProductService = inject(ProductService);

  public ngOnChanges(changes: SimpleChanges): void {
    const id: number = changes['productId'].currentValue;

    if (id) {
      this.sub = this.productService.getProduct(id)
                     .subscribe((product: Product) => this.product = product);
    }
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  public addToCart(product: Product) {
  }
}
