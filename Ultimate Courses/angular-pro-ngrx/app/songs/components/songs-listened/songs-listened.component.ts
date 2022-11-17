import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '../../../store';
import { SongsService } from '../../services/songs.service';

@Component({
  selector: 'songs-listened',
  template: `
    <div class="songs">
      <div *ngFor="let item of listened$ | async">
        {{ item.artist }}
        {{ item.track }}
      </div>
    </div>
  `
})
export class SongsListenedComponent implements OnInit {
  listened$: Observable<any[]>;

  constructor(
    private songsService: SongsService,
    private store: Store) {
  }

  public ngOnInit(): void {
    this.listened$ = this.store.select('playlist')
                         .filter(Boolean)// make sure that this only gets run when there is data
                         .map(playlist => playlist.filter(track => track.listened));
  }

}
