import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Store } from '../../store';

export interface Song {
  id: number;
  name: string;
  listened: boolean;
  favourite: boolean;
}

@Injectable()
export class SongsService {

  constructor(
    private http: Http,
    private store: Store  ) {
  }

  getPlaylist$: Observable<Song[]> = this.http
                     .get('/api/playlist')
                     .map(res => res.json())
                     .do(next => this.store.set('playlist', next));
}
