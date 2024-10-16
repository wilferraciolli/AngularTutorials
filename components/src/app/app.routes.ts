import { Routes } from '@angular/router';
import {CardSliderComponent} from "./business-components/card-slider/card-slider.component";
import {CardSwiperMultipleComponent} from "./business-components/card-swiper-multiple/card-swiper-multiple.component";
import {CardSwiperComponent} from "./business-components/card-swiper/card-swiper.component";

export const routes: Routes = [
  {
    path: 'angularHorizontalScroll',
    component: CardSliderComponent,
  },
  {
    path: 'swiperCardSliders',
    component: CardSwiperComponent,
  },
  {
    path: 'swiperCardSlidersMultiple',
    component: CardSwiperMultipleComponent,
  }
];
