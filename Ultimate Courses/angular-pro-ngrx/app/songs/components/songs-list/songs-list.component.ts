import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '../../../store';
import { Song, SongsService } from '../../services/songs.service';

@Component({
  selector: 'songs-list',
  styleUrls: ['./song-list.component.scss'],
  template: `
    <div class="songs-list">
      <h3>
        <!-- Get the title of the parent component -->
        <ng-content></ng-content>
        <ul>
          <li *ngFor="let item of list">
            <p>{{ item.artist }}</p>
            <span>{{ item.track }}</span>

            <!-- Add the favorites songs -->
            <div class="songs-list__favourite"
                 [class.active]="item.favourite">
            </div>

            <!-- Add the listened songs -->
            <div class="songs-list__listened"
                 [class.active]="item.listened">
            </div>
          </li>
        </ul>
      </h3>
    </div>
  `
})
export class SongsListComponent {
  @Input()
  list: Song[];
}
