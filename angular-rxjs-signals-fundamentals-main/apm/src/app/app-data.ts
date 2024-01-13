import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { ProductData } from './products/product-data';
import { ReviewData } from './reviews/review-data';
import { Product } from './products/product';
import { Review } from './reviews/review';

@Injectable({
  providedIn: 'root',
})
export class AppData implements InMemoryDbService {

  createDb(): {
    products: Product[],
    reviews: Review[]
  } {
    const products: Product[] = ProductData.products;
    const reviews: Review[] = ReviewData.reviews;
    return { products, reviews };
  }
}
