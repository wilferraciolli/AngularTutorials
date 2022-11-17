import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '../../../store';
import { Song, SongsService } from '../../services/songs.service';

@Component({
  selector: 'songs-listened',
  template: `
    <div class="songs">
      <songs-list
        [list]="listened$ | async"
        (toggle)="onToggle($event)">
        Played
      </songs-list>
    </div>
  `
})
export class SongsListenedComponent implements OnInit {
  listened$: Observable<Song[]>;

  constructor(
    private songsService: SongsService,
    private store: Store) {
  }

  public ngOnInit(): void {
    this.listened$ = this.store.select('playlist')
                         .filter(Boolean)// make sure that this only gets run when there is data
                         .map((playlist: Song[]) =>
                           playlist.filter((track: Song) => track.listened)
                         );
  }

  public onToggle(event: any) {
    // use the song service to update the store
    this.songsService.toggle(event);
  }

}
