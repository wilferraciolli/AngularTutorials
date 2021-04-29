import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `<h1>Special Offer of the month {{specialOffer}}</h1>`,
})
export class HomeComponent {
  specialOffer = '10% off all round-the-World flights';
}
