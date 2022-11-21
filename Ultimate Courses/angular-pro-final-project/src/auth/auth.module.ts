import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';

export const ROUTES = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      // { path: 'login', loadChildren: './login/login.module#LoginModule' },
      // { path: 'register', loadChildren: './register/register#module.RegisterModule' }
      { path: 'login', loadChildren: () => LoginModule},
      { path: 'register', loadChildren: () => RegisterModule }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class AuthModule {
}
