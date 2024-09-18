import { Component, inject, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButtons,
  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonContent,
  IonHeader, IonIcon, IonItem, IonLabel, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calendarOutline, cashOutline } from 'ionicons/icons';
import { MovieResult } from '../services/interfaces';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonCard,
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonText, IonCardContent, IonLabel, IonItem, IonIcon
  ]
})
export class DetailsPage implements OnInit {
  private _movieService: MovieService = inject(MovieService);

  public imageBaseUrl: string = 'https://image.tmdb.org/t/p';
  public movie: WritableSignal<MovieResult | null> = signal(null);

  @Input()
  set id(movieId: string) {
    this._movieService.getMovieDetails(movieId)
        .subscribe((movie: MovieResult) => {
          console.log(movie);
          this.movie.set(movie);
        });
  }

  constructor() {
    addIcons({cashOutline, calendarOutline})
  }

  public ngOnInit(): void {
  }

}
