import { Component, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  BehaviorSubject, catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  firstValueFrom,
  of,
  OperatorFunction, switchMap, tap
} from 'rxjs';
import { Post, PostService } from '../../services/post.service';

@Component({
  selector: 'app-to-observable',
  standalone: true,
  imports: [
    CommonModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatOptionModule,
    MatProgressSpinnerModule, FormsModule
  ],
  templateUrl: './to-observable.component.html',
  styleUrls: ['./to-observable.component.scss']
})
export class ToObservableComponent {
  private postsService: PostService = inject(PostService);

  public isLoading: WritableSignal<boolean> = signal<boolean>(false);
  public userId: WritableSignal<number | undefined> = signal<number | undefined>(undefined);

  public posts: Signal<Post[] | undefined> = toSignal(
    toObservable(this.userId).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isLoading.set(true)),
      switchMap((userId: number | undefined) =>
        this.postsService.get(userId).pipe(
          catchError(() => of([])),
          tap(() => this.isLoading.set(false))
        )
      )
    ));
}
