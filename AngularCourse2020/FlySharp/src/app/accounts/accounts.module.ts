import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import {AccountComponent} from '../account/account.component';

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    AccountsRoutingModule
  ]
})
export class AccountsModule { }
