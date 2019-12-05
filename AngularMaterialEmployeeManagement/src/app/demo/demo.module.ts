import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { ButtonsComponent } from './buttons/buttons.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [ButtonsComponent],
  imports: [
    CommonModule,
    DemoRoutingModule,
    FormsModule,
    MaterialModule,
  ]
})
export class DemoModule { }
