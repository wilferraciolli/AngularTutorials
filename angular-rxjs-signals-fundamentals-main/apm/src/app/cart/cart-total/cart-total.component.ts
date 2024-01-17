import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { CartItem } from '../cart';
import { CartService } from '../cart.service';

@Component({
  selector: 'sw-cart-total',
  templateUrl: './cart-total.component.html',
  standalone: true,
  imports: [NgIf, CurrencyPipe]
})
export class CartTotalComponent {
  private cartService: CartService = inject(CartService);

  cartItems: Signal<CartItem[]> = this.cartService.cartItems;

  subTotal: Signal<number> = this.cartService.subTotal;
  deliveryFee: Signal<number> = this.cartService.deliveryFee;
  tax: Signal<number> = this.cartService.tax;
  totalPrice: Signal<number> = this.cartService.totalPrice;
}
