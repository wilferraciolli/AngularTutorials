import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '../../../store';
import { Song, SongsService } from '../../services/songs.service';

@Component({
  selector: 'songs-favourites',
  template: `
    <div class="songs">
      <songs-list
        [list]="favourite$ | async">
        Favourites
      </songs-list>
    </div>
  `
})
export class SongsFavouritesComponent implements OnInit {
  favourite$: Observable<Song[]>;

  constructor(
    private songsService: SongsService,
    private store: Store) {
  }

  public ngOnInit(): void {
    this.favourite$ = this.store.select('playlist')
                          .filter(Boolean)// make sure that this only gets run when there is data
                          .map((playlist: Song[]) =>
                            playlist.filter((track: Song) => track.favourite)
                          );
  }

}
