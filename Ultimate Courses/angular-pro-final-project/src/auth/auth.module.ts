import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// firebase modules
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';


import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { SharedModule } from './shared/shared.module';

export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      // { path: 'login', loadChildren: './login/login.module#LoginModule' },
      // { path: 'register', loadChildren: './register/register#module.RegisterModule' }
      { path: 'login', loadChildren: () => LoginModule },
      { path: 'register', loadChildren: () => RegisterModule }
    ]
  }
];

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyDb-PBwWDDGbBxC0F5MqiPf4UmPOLp_Gpk",
  authDomain: "angular-app-f3d4d.firebaseapp.com",
  databaseURL: "https://angular-app-f3d4d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "angular-app-f3d4d",
  storageBucket: "angular-app-f3d4d.appspot.com",
  messagingSenderId: "582598598947"
  // appId: "1:582598598947:web:2b4303c802777c020fac96"
};

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule.forRoot() // call for root here to avoid duplicated providers
  ]
})
export class AuthModule {
}
