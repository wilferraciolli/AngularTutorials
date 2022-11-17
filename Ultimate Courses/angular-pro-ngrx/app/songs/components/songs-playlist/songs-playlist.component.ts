import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Store } from '../../../store';
import { SongsService } from '../../services/songs.service';

@Component({
  selector: 'songs-playlist',
  template: `
    <div class="songs">
      <songs-list
      [list]="playlist$ | async">
        Playlist
      </songs-list>
    </div>
  `
})
export class SongsPlaylistComponent implements OnInit, OnDestroy {

  playlist$: Observable<any[]>;
  subscription: Subscription;

  constructor(
    private songsService: SongsService,
    private store: Store) {
  }

  public ngOnInit(): void {
    this.playlist$ = this.store.select('playlist');

    // initiate data flow to subscribe to the store
    this.subscription = this.songsService.getPlaylist$.subscribe();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
