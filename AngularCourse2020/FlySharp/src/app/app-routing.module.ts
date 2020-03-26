import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {BuyFlightComponent} from './buy-flight/buy-flight.component';
import {MyFlightsComponent} from './my-flights/my-flights.component';
import {AccountComponent} from './account/account.component';

const routes: Routes = [

    {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    },

    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'buy',
      component: BuyFlightComponent,
      pathMatch: 'prefix'
    },
    {
      path: 'buy/:origin',
      component: BuyFlightComponent
    },
    {
      path: 'myflights',
      component: MyFlightsComponent
    },
    {
      path: 'account',
      loadChildren: () => import('./accounts/accounts.module')
        .then(mod => mod.AccountsModule)
    }
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
