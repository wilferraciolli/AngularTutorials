import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '../../../store';
import { SongsService } from '../../services/songs.service';

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
  favourite$: Observable<any[]>;

  constructor(
    private songsService: SongsService,
    private store: Store) {
  }

  public ngOnInit(): void {
    this.favourite$ = this.store.select('playlist')
                          .filter(Boolean)// make sure that this only gets run when there is data
                          .map(playlist => playlist.filter(track => track.favourite));
  }

}
