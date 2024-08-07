import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';
  loading = true;

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: Product[] = [];
  products: Product[] = [];

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    // print out optional params
    console.log('optional params passed in ', this.route.snapshot.paramMap.get('productType'));

    console.log('Query params passed in ', this.route.snapshot.queryParamMap.get('filterBy'));
    console.log('Query params passed in ', this.route.snapshot.queryParamMap.get('showImage'));

    // get the query params to set initial values to the component
    this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
    this.showImage = this.route.snapshot.queryParamMap.get('showImage') === 'true';

    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.performFilter(this.listFilter);
        this.loading = false;
      },
      error: err => this.errorMessage = err
    });
  }

  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }
}
