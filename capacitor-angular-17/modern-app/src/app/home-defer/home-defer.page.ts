import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import {
  IonAlert,
  IonAvatar,
  IonBadge,
  IonContent,
  IonHeader,
  IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonSkeletonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { catchError, finalize } from 'rxjs';
import { ApiResult, MovieResult } from '../services/interfaces';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-home-defer',
  templateUrl: './home-defer.page.html',
  styleUrls: ['./home-defer.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonAlert, IonAvatar, IonBadge,
    IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonSkeletonText, RouterLink
  ]
})
export class HomeDeferPage implements OnInit {
  private _movieService: MovieService = inject(MovieService);

  private currentPage: number = 1;
  public error = null;
  public isLoading: boolean = false;
  public movies: MovieResult[] = [];
  public imageBaseUrl: string = 'https://image.tmdb.org/t/p';

  public skeletonArray: number[] = new Array(5);

  constructor() {
  }

  public ngOnInit(): void {
    this.loadMovies();
  }

  public loadMovies(event?: InfiniteScrollCustomEvent): void {
    this.error = null;

    if (!event) {
      this.isLoading = true;
    }

    this._movieService.getTopRatedMovies()
        .pipe(
          finalize(() => {
            this.isLoading = false;
            if (event) {
              event.target.complete;
            }
          }),
          catchError((err: any) => {
            console.log(err);
            this.error = err.error.status_message;

            return [];
          })
        ).subscribe({
      next: (res: ApiResult) => {
        this.movies.push(...res.results);
        event?.target.complete();

        if (event) {
          event.target.disabled = res.total_pages === this.currentPage;
        }
      }
    });
  }

  public loadMoreMovies(event: InfiniteScrollCustomEvent): void {
    this.currentPage++;
    this.loadMovies(event);
  }
}
