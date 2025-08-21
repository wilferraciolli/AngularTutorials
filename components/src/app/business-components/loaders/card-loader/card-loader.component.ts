import { Component } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';

import { WtLoadersComponent } from 'wt-loaders';
import { LoaderCardComponent } from 'wt-loaders';

@Component({
  selector: 'app-card-loader',
  standalone: true,
  imports: [
    WtLoadersComponent,
    LoaderCardComponent,
    MatCard,
    MatCardContent
  ],
  templateUrl: './card-loader.component.html',
  styleUrl: './card-loader.component.scss'
})
export class CardLoaderComponent {

}
