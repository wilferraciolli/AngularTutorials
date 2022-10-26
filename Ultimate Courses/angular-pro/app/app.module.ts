import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthFormModule } from './auth-form/auth-form.module';
import { CreditCardDirective } from './credit-card/credit-card.directive';
import { FilesizePipe } from './filesize.pipe';
import { MyForDirective } from './my-for/my-for.directive';

import { ExampleOneComponent } from './one/one.component';
import { StockInventoryModule } from './stock-inventory/stock-inventory.module';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { ExampleTwoComponent } from './two/two.component';



@NgModule({
  imports: [
    BrowserModule,
    AuthFormModule,
    StockInventoryModule
  ],
  bootstrap: [
    AppComponent
  ],
  exports: [
    CreditCardDirective
  ],
  declarations: [
    AppComponent,
    ExampleOneComponent,
    ExampleTwoComponent,
    CreditCardDirective,
    TooltipDirective,
    MyForDirective,
    FilesizePipe
  ]
})
export class AppModule {
}
