import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { concatMap, delay, from, max, mergeMap, min, Observable, of, range, switchMap } from 'rxjs';

@Component({
  selector: 'app-higher-order-maps',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatDividerModule, MatToolbarModule],
  templateUrl: './higher-order-maps.component.html',
  styleUrls: ['./higher-order-maps.component.scss']
})
export class HigherOrderMapsComponent implements OnInit {
  public values: number[] = [1, 2, 3, 4, 5];

  public concatMapValues: WritableSignal<number[]> = signal([]);
  public mergeMapValues: WritableSignal<number[]> = signal([]);
  public switchMapValues: WritableSignal<number[]> = signal([]);

  // public number$: Observable<number> = from(this.values);

  public minValue: number = 0;
  public maxValue: number = 0;

  public ngOnInit(): void {

    this._subscribeToConcatMap();
    this._subscribeToMergeMap();
    this._subscribeToSwitchMap();
  }

  private _subscribeToConcatMap(): void {
    range(1, 5).pipe(
      concatMap((i: number) => of(i)
      .pipe(
        delay(this._randomDelay())
      ))
    ).subscribe((v: number) => {
        console.log('concat map value emitted ', v);
        this.concatMapValues.mutate((currentValues: number[]) => this.concatMapValues().push(v));
      }
    );
  }

  private _subscribeToMergeMap(): void {
    range(1, 5).pipe(
      mergeMap((i: number) => of(i)
      .pipe(
        delay(this._randomDelay())
      ))
    ).subscribe((v: number) => {
        console.log('merge map value emitted ', v);
        this.mergeMapValues.mutate((currentValues: number[]) => this.mergeMapValues().push(v));
      }
    );
  }

  private _subscribeToSwitchMap(): void {
    range(1, 5).pipe(
      switchMap((i: number) => of(i)
      .pipe(
        delay(this._randomDelay())
      ))
    ).subscribe((v: number) => {
        console.log('switch map value emitted ', v);
        this.switchMapValues.mutate((currentValues: number[]) => this.switchMapValues().push(v));
      }
    );
  }

  private _randomDelay(): number {
    // random delay between 0.5 and 1.5 seconds
    return Math.floor(Math.random() * 1000) + 500;
  }
}
