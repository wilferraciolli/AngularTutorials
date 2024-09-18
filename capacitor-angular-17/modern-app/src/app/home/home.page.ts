import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonAvatar,
  IonSkeletonText, IonAlert, IonLabel, IonBadge, IonInfiniteScroll, IonInfiniteScrollContent
} from '@ionic/angular/standalone';
import { catchError, finalize } from 'rxjs';
import { ApiResult, MovieResult } from '../services/interfaces';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonAvatar, IonSkeletonText, IonAlert,
    RouterLink, IonLabel, IonBadge, IonInfiniteScroll, IonInfiniteScrollContent, DatePipe
  ]
})
export class HomePage implements OnInit {
  private _movieService: MovieService = inject(MovieService);

  private currentPage: number = 1;
  public  error = null;
  public isLoading: boolean = false;
  public  movies: MovieResult[] = [];
  public  imageBaseUrl: string = 'https://image.tmdb.org/t/p';

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
