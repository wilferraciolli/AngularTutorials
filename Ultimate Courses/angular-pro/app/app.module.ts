import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadingStrategy, Route, RouterModule, Routes } from '@angular/router';
import { Observable } from 'rxjs';

import { AppComponent } from './app.component';
import { AuthFormModule } from './auth-form/auth-form.module';
import { CreditCardDirective } from './credit-card/credit-card.directive';
import { DashboardModule } from './dashboard/dashboard.module';
import { FilesizePipe } from './filesize.pipe';
import { MailModule } from './mail/mail.module';
import { MyForDirective } from './my-for/my-for.directive';

import { ExampleOneComponent } from './one/one.component';
import { StockInventoryModule } from './stock-inventory/stock-inventory.module';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { ExampleTwoComponent } from './two/two.component';

// class to resolve the custom module preload strategy
export class CustomPreload implements PreloadingStrategy {
  public preload(route: Route, fn: () => Observable<any>): Observable<any> {
    // specify what routes should be preloading during application start up, look at the route config to see whether the preload is set to true
    return route.data && route.data['preload'] ? fn() : Observable.of(null);
  }
}

export const ROUTES: Routes = [
  { path: 'dashboard', data: { preload: true }, loadChildren: () => DashboardModule },
  { path: '**', redirectTo: 'mail/folder/inbox' }
];

@NgModule({
  imports: [
    BrowserModule,
    AuthFormModule,
    StockInventoryModule,
    MailModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { preloadingStrategy: CustomPreload })
  ],
  bootstrap: [
    AppComponent
  ],
  exports: [
    CreditCardDirective
  ],
  providers: [
    CustomPreload
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
