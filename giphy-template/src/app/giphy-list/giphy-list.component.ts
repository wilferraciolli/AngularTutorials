import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GiphyApiResponse, GiphyGif } from '../interfaces/giphy/giphy.interfaces';
import { GiphyComponent } from '../giphy/giphy.component';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-giphy-list',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, GiphyComponent, CommonModule],
  templateUrl: './giphy-list.component.html',
  styleUrl: './giphy-list.component.scss'
})
export class GiphyListComponent implements OnInit {
  private http = inject(HttpClient);

  private _baseUrl: string = 'https://api.giphy.com/v1/gifs/';
  private _apiKey: string = environment.giphyApiKey;

  public searchTerm = '';
  public gifs: GiphyGif[] = [];

  ngOnInit(): void {
    this.getTrendingGifs();
  }

  public getTrendingGifs(): void {
    this.http.get<GiphyApiResponse>(this._buildTrendingUrl())
      .subscribe(response => {
        this.gifs = response.data;
      });
  }

  public searchGifs(): void {
    this.http.get<GiphyApiResponse>(this._buildSearchUrl())
    .subscribe((response: GiphyApiResponse) => {
      this.gifs = response.data;
    });
  }

  private _buildTrendingUrl(): string {
    return `${this._baseUrl}trending?api_key=${this._apiKey}&limit=10&offset=0&rating=g&bundle=messaging_non_clips`;
  }

  private _buildSearchUrl(): string {
    return `${this._baseUrl}search?api_key=${this._apiKey}&q=${this.searchTerm}&limit=10&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
  }
}
