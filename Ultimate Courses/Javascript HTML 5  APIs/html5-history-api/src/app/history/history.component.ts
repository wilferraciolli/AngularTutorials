import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  public ngOnInit(): void {
    // check if on base root
    if (location.pathname === '/') {
      // add data and append to the url
      const player: Player = players[0];
      history.replaceState(player, '', player.id);
    }
  }
}

export const players: Player[] = [
  {
    id: 'id1',
    name: 'Mario',
    bio: 'Italian plumber and lead character'
  },
  {
    id: 'id2',
    name: 'Luigi',
    bio: 'Mario brother'
  },
  {
    id: 'id3',
    name: 'Yoshi',
    bio: 'Green dinosaur turn enemies into eggs'
  },
  {
    id: 'id4',
    name: 'Wario',
    bio: 'Mario yellow and purplr arch-rival'
  }
];

export interface Player {
  id: string;
  name: string;
  bio: string;
}
