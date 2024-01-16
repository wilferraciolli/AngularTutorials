import { effect, EffectRef, Injectable, signal, WritableSignal } from '@angular/core';
import { Product } from '../products/product';
import { CartItem } from './cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItems: WritableSignal<CartItem[]> = signal<CartItem[]>([]);

  // effect to test when an item is added to the cart
  public eLength: EffectRef = effect(() =>
    console.log('Cart array changed ', this.cartItems().length));

  public addToCart(productToAdd: Product): void {
    // to be able to update a signal, we have to get the current value, then add the spread operator to copy the current one and add the next one
    this.cartItems.update((items: CartItem[]) =>
      [...items, { product: productToAdd, quantity: 1 }]
    );
  }

}
