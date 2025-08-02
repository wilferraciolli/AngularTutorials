# Components

This project is used define sample template components
The tutorial can be found here `https://www.youtube.com/watch?app=desktop&v=qUTYO_IqPqM`
It use swiper js `https://swiperjs.com/demos`


# Dependencies
### Material
`ng add @angular/material`

### WtLoaders
`npm install wtloaders`
peerdependencies `npm install ngx-skeleton-loader --save-dev`

### Swiper Js
This library allow many swipes and gestures to be used just by passing some configs

`npm intall swiper`
Then import the swiper module onto the main.ts file and call the register function right underneath
```ts
      import { register as registerSwiperElements } from 'swiper/element/bundle';
      
      // register Swiper custom elements
      registerSwiperElements();
```
Next within the component you want to use swiper, import and declare the CUSTOM SCHEMA
```ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

...

@Component({
selector: 'app-slider',
standalone: true,
imports: [],
schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
templateUrl: './slider.component.html',
styleUrl: './slider.component.css',
})
export class SliderComponent {}
```
Finally to use it, just declare the swiper container and items
```angular2html
<swiper-container
slides-per-view=2
speed=1500
  class="mySwiper"
  loop="true"
  navigation="true"
  keyboard="true"
  mousewheel="true"
  css-mode="true"
>
  <swiper-slide>Slide 1</swiper-slide>
  <swiper-slide>Slide 2</swiper-slide>
  <swiper-slide>Slide 3</swiper-slide>
  <swiper-slide>Slide 4</swiper-slide>
</swiper-container>

```
