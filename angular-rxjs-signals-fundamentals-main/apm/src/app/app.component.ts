//import 'zone.js/dist/zone';  // Required for Stackblitz
import { Component, inject, Signal } from '@angular/core';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from './cart/cart.service';

@Component({
  selector: 'pm-root',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public pageTitle: string = 'Acme Product Management';

  private cartService: CartService = inject(CartService);

  public readonly cartCount: Signal<number> = this.cartService.cartCount;

}
