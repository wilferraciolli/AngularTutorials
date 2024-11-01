import { DatePipe, IMAGE_CONFIG, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatCard, MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSmImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-directives',
  standalone: true,
  imports: [
    MatDivider,
    DatePipe,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatExpansionModule,
    NgOptimizedImage,
    MatCardImage,
    MatCardAvatar,
    MatCardSmImage,
    MatButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem
  ],
  // provider used to work with the ngImage placeholder
  providers: [
    {
      provide: IMAGE_CONFIG,
      useValue: {
        placeholderResolution: 40
      }
    },
  ],
  templateUrl: './directives.component.html',
  styleUrl: './directives.component.scss'
})
export class DirectivesComponent {
  public panelOpenState: boolean = false;
}
