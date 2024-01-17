import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { Observable } from 'rxjs';
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

  private productService: ProductService = inject(ProductService);

  public products: Signal<Product[] | undefined> = this.productService.products;
  public errorMessage: Signal<string | undefined> = this.productService.productsError;

  public selectedProductId: Signal<number | undefined> = this.productService.selectedProductId;

  public onSelected(productId: number): void {
    // add state to the service when the user selects a product
    this.productService.productSelected(productId);
  }
}
