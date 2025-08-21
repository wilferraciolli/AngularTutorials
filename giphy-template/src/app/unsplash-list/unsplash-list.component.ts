import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { UnsplashSearchResponse, UnsplashPhoto } from '../interfaces/unsplash/unsplash.interfaces';

@Component({
  selector: 'app-unsplash-list',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, CommonModule],
  templateUrl: './unsplash-list.component.html',
  styleUrl: './unsplash-list.component.scss'
})
export class UnsplashListComponent implements OnInit {
  private http = inject(HttpClient);

  private _searchUrl: string = 'https://api.unsplash.com/search/photos';
  private _apiKey: string = environment.unsplashApiKey;

  public searchTerm = '';
  public images: UnsplashPhoto[] = [];

  ngOnInit(): void {
    this.getTrendingImages();
  }

  public getTrendingImages(): void {
    // Get trending photos (using a default search, e.g., "popular")
    this.http.get<UnsplashSearchResponse>(`${this._searchUrl}?query=popular&client_id=${this._apiKey}`)
      .subscribe(response => {
        this.images = response.results;
      });
  }

  public searchImages(): void {
    this.http.get<UnsplashSearchResponse>(`${this._searchUrl}?query=${this.searchTerm}&client_id=${this._apiKey}`)
      .subscribe(response => {
        this.images = response.results;
      });
  }
}
