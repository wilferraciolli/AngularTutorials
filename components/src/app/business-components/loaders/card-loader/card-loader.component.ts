import { Component } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';

// import { WtLoadersComponent } from 'wt-loaders';

@Component({
  selector: 'app-card-loader',
  standalone: true,
  imports: [
    // WtLoadersComponent,
    MatCard, MatCardContent
  ],
  templateUrl: './card-loader.component.html',
  styleUrl: './card-loader.component.scss'
})
export class CardLoaderComponent {

}
