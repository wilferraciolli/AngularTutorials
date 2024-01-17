import { Component, inject, Signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CartItem } from '../cart';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartService } from '../cart.service';

@Component({
  selector: 'sw-cart-list',
  standalone: true,
  imports: [CartItemComponent, NgFor, NgIf],
  templateUrl: 'cart-list.component.html'
})
export class CartListComponent {
  public pageTitle: string = 'Cart';

  private cartService: CartService = inject(CartService);

  public readonly cartItems: Signal<CartItem[]> = this.cartService.cartItems;
}
