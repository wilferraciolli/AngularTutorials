import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthFormModule } from './auth-form/auth-form.module';
import { CreditCardDirective } from './credit-card/credit-card.directive';

import { ExampleOneComponent } from './one/one.component';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { ExampleTwoComponent } from './two/two.component';



@NgModule({
  imports: [
    BrowserModule,
    AuthFormModule
  ],
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    ExampleOneComponent,
    ExampleTwoComponent,
    CreditCardDirective,
    TooltipDirective
  ]
})
export class AppModule {
}
