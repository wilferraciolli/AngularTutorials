import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ComponentStoreItemComponent } from '../component-store-item/component-store-item.component';

@Component({
  selector: 'component-store',
  imports: [
    MatButtonModule, ComponentStoreItemComponent
  ],
  templateUrl: './component-store.component.html',
  styleUrl: './component-store.component.scss'
})
export class ComponentStoreComponent {

}
