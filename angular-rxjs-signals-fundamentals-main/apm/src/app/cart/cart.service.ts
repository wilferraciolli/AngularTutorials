import { computed, effect, EffectRef, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Product } from '../products/product';
import { CartItem } from './cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseTax: number = 10;
  private baseDeliveryFee: number = 5.99;

  public cartItems: WritableSignal<CartItem[]> = signal<CartItem[]>([]);

  // create a computed function to calculate the count once each item changes (+ or -)
  public cartCount: Signal<number> = computed(() =>
    this.cartItems().reduce((accQty: number, item: CartItem) =>
      accQty + item.quantity, 0)
  );

  // effect to test when an item is added to the cart
  public eLength: EffectRef = effect(() =>
    console.log('Cart array changed ', this.cartItems().length));

  // calculate subtotal (quantity * price)
  public subTotal: Signal<number> = computed(() =>
    this.cartItems().reduce((accTotal: number, item: CartItem) =>
      accTotal + (item.quantity * item.product.price), 0)
  );

  // calculate delivery fee (5.99 < 50 otherwise free)
  public deliveryFee: Signal<number> = computed<number>(() =>
    this.subTotal() < 50 ? this.baseDeliveryFee : 0
  );

  public tax: Signal<number> = computed<number>(() =>
    Math.round((this.subTotal() + this.baseTax) / 100)
  );

  // calculate total Price (subtotal + delivery + tax)
  public totalPrice: Signal<number> = computed(() =>
    this.subTotal() + this.deliveryFee() + this.tax()
  );

  public addToCart(productToAdd: Product): void {
    // to be able to update a signal, we have to get the current value, then add the spread operator to copy the current one and add the next one
    this.cartItems.update((items: CartItem[]) =>
      [...items, { product: productToAdd, quantity: 1 }]
    );
  }

  public updateQuantity(cartItem: CartItem, quantity: number): void {
    // update the quantity on the cart item
    this.cartItems.update((items: CartItem[]) =>
      items.map((item: CartItem) =>
        // loop through the array and if the id matches then update object and return the whole new array to the signal
        item.product.id === cartItem.product.id ? { ...item, quantity } : item)
    );
  }

  public removeFromCart(cartItem: CartItem): void {
    this.cartItems.update((items: CartItem[]) =>
      items.filter((item: CartItem) =>
        item.product.id !== cartItem.product.id)
    );
  }

  public calculateSubTotalForItem(item: CartItem): number {
    return item.quantity * item.product.price;
  }

}
