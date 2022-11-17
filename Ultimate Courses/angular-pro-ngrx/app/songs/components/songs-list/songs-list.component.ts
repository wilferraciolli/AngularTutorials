import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Song } from '../../services/songs.service';

@Component({
  selector: 'songs-list',
  styleUrls: ['./song-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="songs-list">
      <h3>
        <!-- Get the title of the parent component -->
        <ng-content></ng-content>
        <ul>
          <li *ngFor="let item of list; let i = index;">
            <p>{{ item.artist }}</p>
            <span>{{ item.track }}</span>

            <!-- Add the favorites songs -->
            <div class="songs-list__favourite"
                 [class.active]="item.favourite"
                 (click)="toggleItem(i, 'favourite')">
            </div>

            <!-- Add the listened songs -->
            <div class="songs-list__listened"
                 [class.active]="item.listened"
                 (click)="toggleItem(i, 'listened')">
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

  @Output()
  toggle = new EventEmitter<any>();


  public toggleItem(index: number, prop: string) {
    // get the list that has come in
    const track = this.list[index];

    this.toggle.emit({
      // get the property passed in and toggle its value
      track: { ...track, [prop]: !track[prop] }
    });
  }
}
