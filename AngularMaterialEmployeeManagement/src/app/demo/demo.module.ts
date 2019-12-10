import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { ButtonsComponent } from './buttons/buttons.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { FlexboxComponent } from './flexbox/flexbox.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ButtonsComponent, FlexboxComponent],
  imports: [
    CommonModule,
    DemoRoutingModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
  ]
})
export class DemoModule { }
