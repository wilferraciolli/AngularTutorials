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
    private store: Store) {
  }

  getPlaylist$: Observable<Song[]> = this.http
                                         .get('/api/playlist')
                                         .map(res => res.json())
                                         .do(next => this.store.set('playlist', next));

  public toggle(event: any): void {
    console.log('Event received ', event);

    // update the item
    this.http
        .put(`/api/playlist/${ event.track.id }`, event.track)
        .map(res => res.json())
        .subscribe((track: Song) => {
          console.log('After updating the song ', track);

          // update the store
          const value = this.store.value.playlist;

          const playlist = value.map((song: Song) => {
            if (event.track.id === song.id) {
              // merge old value with new value after update
              return { ...song, ...event.track };
            } else {
              return song;
            }
          });

          // update the store
          this.store.set('playlist', playlist);
        });

  }
}
