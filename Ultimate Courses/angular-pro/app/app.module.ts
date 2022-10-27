import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthFormModule } from './auth-form/auth-form.module';
import { CreditCardDirective } from './credit-card/credit-card.directive';
import { FilesizePipe } from './filesize.pipe';
import { MailModule } from './mail/mail.module';
import { MyForDirective } from './my-for/my-for.directive';

import { ExampleOneComponent } from './one/one.component';
import { StockInventoryModule } from './stock-inventory/stock-inventory.module';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { ExampleTwoComponent } from './two/two.component';

export const ROUTES: Routes = [
  { path: '**', redirectTo: 'folder/inbox' }
];

@NgModule({
  imports: [
    BrowserModule,
    AuthFormModule,
    StockInventoryModule,
    MailModule,
    RouterModule.forRoot(ROUTES)
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
