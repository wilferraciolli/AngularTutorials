import {ChangeDetectionStrategy, Component, signal, WritableSignal} from '@angular/core';

@Component({
  selector: 'app-star-rating',
  imports: [],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarRatingComponent {
  protected readonly star: number = 5;
  protected readonly value: WritableSignal<number> = signal(0);
  protected readonly hovered: WritableSignal<number | null> = signal(null);

  protected setRating(newValue: number): void {
    if (this.value() === newValue) {
      this.value.set(0);
    } else {
      this.value.set(newValue);
    }
  }

  protected setHover(value: number | null): void {
    this.hovered.set(value);
  }
}
