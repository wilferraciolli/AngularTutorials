import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DrinkViewerComponent } from './containers/drink-viewer.component';
import { PizzaViewerComponent } from './containers/pizza-viewer.component';
import { SideViewerComponent } from './containers/side-viewer.component';
import { FoodStoreModule } from './food-store/food-store.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FoodStoreModule.forRoot({
      storeId: 10292,
      storeToken: 'eca938c99c0e9ff91029dc'
    })
  ],
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    PizzaViewerComponent,
    DrinkViewerComponent,
    SideViewerComponent
  ],
  providers: [
    // create a provider to inject a string token
    { provide: 'api', useValue: '/api/pizzas' }
  ]
})
export class AppModule {
}
