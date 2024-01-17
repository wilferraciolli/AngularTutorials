import { Component, computed, inject, Input, Signal, signal, WritableSignal } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CartItem } from '../cart';
import { CartService } from '../cart.service';

@Component({
  selector: 'sw-cart-item',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, NgFor, NgIf],
  templateUrl: './cart-item.component.html'
})
export class CartItemComponent {

  // create the input as a setter so we can set the value to the signal, going forwards, this will be included on newer versions of Angular
  @Input({ required: true })
  set cartItem(ci: CartItem) {
    this.item.set(ci);
  }

  private cartService: CartService = inject(CartService);

  public item: WritableSignal<CartItem> = signal<CartItem>(undefined!);

  // Quantity available (hard-coded to 8)
  // Mapped to an array from 1-8
  //qtyArr = [...Array(8).keys()].map(x => x + 1);

  // Calculate the extended price
  public exPrice: Signal<number> = computed(() =>
    this.item().quantity * this.item().product.price
  );

  // calculate the quantity available for the item
  public qtyArr: Signal<number[]> = computed(() =>
    [...Array(this.item().product.quantityInStock).keys()]
    .map((x: number) => x + 1)
  );

  onQuantitySelected(quantity: number): void {
    this.cartService.updateQuantity(this.item(), Number(quantity));
  }

  removeFromCart(): void {
    this.cartService.removeFromCart(this.item());
  }
}
