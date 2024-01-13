import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { NgIf, NgFor, NgClass } from '@angular/common';
import { catchError, EMPTY, Subscription, tap } from 'rxjs';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, ProductDetailComponent]
})
export class ProductListComponent implements OnInit, OnDestroy {

  public pageTitle: string = 'Products';
  public errorMessage: string = '';

  public products: Product[] = [];

  // Selected product id to highlight the entry
  public selectedProductId: number = 0;

  private sub!: Subscription;
  private productService: ProductService = inject(ProductService);

  ngOnInit(): void {
    this.sub = this.productService.getProducts().pipe(
      tap(() => console.log('received data')),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    ).subscribe((products: Product[]) =>
      this.products = products
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public onSelected(productId: number): void {
    this.selectedProductId = productId;
  }
}
