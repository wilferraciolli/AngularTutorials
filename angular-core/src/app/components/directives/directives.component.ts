import { DatePipe, IMAGE_CONFIG, NgClass, NgIf, NgOptimizedImage, NgStyle } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSmImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';

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
    MatMenuItem,
    MatCardActions,
    NgClass,
    NgStyle,
    MatSlider,
    MatSliderThumb,
    FormsModule,
    MatInput,
    NgIf,
    MatProgressSpinner,
    MatIcon
  ],
  // provider used to work with the ngImage placeholder
  providers: [
    {
      provide: IMAGE_CONFIG,
      useValue: {
        placeholderResolution: 40
      }
    }
  ],
  templateUrl: './directives.component.html',
  styleUrl: './directives.component.scss'
})
export class DirectivesComponent {
  public panelOpenState: boolean = false;
  public shouldAddClass: boolean = false;
  public shouldHideClass: boolean = false;
  public fontSize: WritableSignal<string> = signal('10px');
  public fontFamily: string = 'Arial';
  public modelValue: string = 'Directive ng model';

  public isLoading: WritableSignal<boolean> = signal(false);
  public showPrize: WritableSignal<boolean> = signal(false);

  public toggleClasses(): void {
    this.shouldAddClass = !this.shouldAddClass;
  }

  public toggleHideClass(): void {
    this.shouldHideClass = !this.shouldHideClass;
  }

  public toggleNgStyle(value: number): void {
    this.fontSize.set(`${value}px`);
    this.fontFamily = 'Roboto';
  }

  public updateModelValue(): void {
    this.modelValue = 'Value updated from within component';
  }

  public toggleLoading(): void {
    this.isLoading.set(!this.isLoading());
  }

  public togglePrize(): void {
    this.showPrize.set(!this.showPrize());
  }
}
