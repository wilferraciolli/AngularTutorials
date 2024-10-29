import {Component, ViewEncapsulation} from '@angular/core';
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";

@Component({
  selector: 'app-card-slider',
  standalone: true,
  imports: [
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
    CdkFixedSizeVirtualScroll
  ],
  templateUrl: './card-slider.component.html',
  styleUrl: './card-slider.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CardSliderComponent {
  items = Array.from({length: 100})
    .map((_, i) => `Item #${i}`);
}
