import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResult, MovieResult } from './interfaces';

const BASE_URL: string = 'https://api.themoviedb.org/3';
const API_KEY: string = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private _httpClient: HttpClient = inject(HttpClient);

  constructor() {
  }

  public getTopRatedMovies(page: number = 1): Observable<ApiResult> {
    return this._httpClient.get<ApiResult>(`${BASE_URL}/movie/popular?page=${page}&api_key=${API_KEY}`);
  }

  public getMovieDetails(id: string): Observable<MovieResult> {
    return this._httpClient.get<MovieResult>(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  }
}
