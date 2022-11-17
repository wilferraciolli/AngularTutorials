import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Store } from '../../../store';
import { Song, SongsService } from '../../services/songs.service';

@Component({
  selector: 'songs-playlist',
  template: `
    <div class="songs">
      <songs-list
        [list]="playlist$ | async"
        (toggle)="onToggle($event)">
        Playlist
      </songs-list>
    </div>
  `
})
export class SongsPlaylistComponent implements OnInit, OnDestroy {

  playlist$: Observable<Song[]>;
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

  public onToggle(event: any) {
    // use the song service to update the store
    this.songsService.toggle(event);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
