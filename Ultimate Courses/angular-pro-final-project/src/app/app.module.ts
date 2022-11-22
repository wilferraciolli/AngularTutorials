import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { Store } from 'store';
import { AuthModule } from '../auth/auth.module';
import { HealthModule } from '../health/health.module';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppNavComponent } from './components/app-nav/app-nav.component';
import { AppComponent } from './containers/app/app.component';

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'schedule' }
];

@NgModule({
  imports: [
    AuthModule,
    BrowserModule,
    HealthModule,
    RouterModule.forRoot(ROUTES)
  ],
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppNavComponent
  ],
  providers: [
    Store
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}


/*
const firebaseConfig = {
  apiKey: "AIzaSyA4mGFh3bh-8ThrtDCCMye_DUx_5TP3db4",
  authDomain: "fitnessapp-5745e.firebaseapp.com",
  projectId: "fitnessapp-5745e",
  storageBucket: "fitnessapp-5745e.appspot.com",
  messagingSenderId: "823037893475",
  appId: "1:823037893475:web:ae780bf534d601b1e05156",
  measurementId: "G-9WZBPFQX3D"
};
 */
