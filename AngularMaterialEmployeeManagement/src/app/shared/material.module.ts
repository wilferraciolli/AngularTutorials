import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

const MODULES = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule
];

@NgModule({
  imports: [MODULES],
  exports: [MODULES]
})

// Class to import all of the material modules
export class MaterialModule {
}
