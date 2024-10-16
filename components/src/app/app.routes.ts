import { Routes } from '@angular/router';
import {CardSliderComponent} from "./business-components/card-slider/card-slider.component";
import {CardSwiperMultipleComponent} from "./business-components/card-swiper-multiple/card-swiper-multiple.component";
import {CardSwiperComponent} from "./business-components/card-swiper/card-swiper.component";
import {
  CardSwiperCoverflowComponent
} from "./business-components/card-swiper-coverflow/card-swiper-coverflow.component";
import {CardSwiperCubeComponent} from "./business-components/card-swiper-cube/card-swiper-cube.component";

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
  },
  {
    path: 'swiperCardCoverflow',
    component: CardSwiperCoverflowComponent,
  },
  {
    path: 'swiperCardCube',
    component: CardSwiperCubeComponent,
  }
];
