import { JsonPipe } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatProgressBar } from '@angular/material/progress-bar';
import {
  catchError,
  defaultIfEmpty, delay,
  filter,
  interval,
  lastValueFrom,
  Observable,
  of,
  switchMap,
  take,
  tap
} from 'rxjs';
import { IModel } from '../model.interface';
import { ResultCode } from '../result-code.constant';

@Component({
  selector: 'app-polling-pending',
  standalone: true,
  imports: [
    JsonPipe,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatDivider,
    MatProgressBar
  ],
  templateUrl: './polling-pending.component.html',
  styleUrl: './polling-pending.component.scss'
})
export class PollingPendingComponent {
  private pollDelay: number = 1000;
  private retryCont: number = 15;

  private progressBarMin: number = 0;
  private progressBarMax: number = 100;

  protected isLoading: WritableSignal<boolean> = signal<boolean>(true);
  protected progress: WritableSignal<number> = signal<number>(this.progressBarMin);
  protected currentAttemptCount: WritableSignal<number> = signal<number>(0);

  protected result: WritableSignal<IModel | null> = signal(null);

  public async startPolling(): Promise<void> {
    this.isLoading.set(true);

    this.result.set(await this._startPolling());

    this.progress.set(this.progressBarMax);
    this.isLoading.set(false);
  }

  private async _startPolling(): Promise<IModel | null> {
    return await lastValueFrom(
      interval(this.pollDelay).pipe(
        take(this.retryCont),
        switchMap((attempt: number) => this._simulateHttpCall(attempt)),
        tap((model: IModel | null) => console.log('Model after simulating ', model)),
        filter((model: IModel | null) => model !== null && model.attributes.resultCode !== ResultCode.PENDING),
        take(1),
        defaultIfEmpty(null),
        catchError(() => of(null)),
        tap((model: IModel | null) => {
          if (model !== null) {
            console.log('Final non-pending resultCode:', model.attributes.resultCode);
          }
        })
      )
    );
  }

  // Simulated HTTP call that takes ~500ms to respond (to mimic slow network)
  // For demo: Returns PENDING for first 3 attempts, then SUCCESS, or ERROR on attempt 5
  private _simulateHttpCall(attempt: number): Observable<IModel | null> {
    this.progress.set((this.progressBarMax / this.retryCont) * attempt);
    this.currentAttemptCount.set(attempt);

    const delayMs = 500; // Simulate slow response time
    let result: IModel;

    if (attempt < 10) {
      result = { attributes: { resultCode: ResultCode.PENDING } };
    } else if (attempt < 13) {
      result = { attributes: { resultCode: ResultCode.ERROR, data: 'Simulated error' } };
    } else {
      result = { attributes: { resultCode: ResultCode.SUCCESS, data: 'Simulated success data' } };
    }

    return of(result).pipe(
      delay(delayMs), // Simulate network delay
      catchError(() => of(null)) // In case of real errors
    );
  }
}
