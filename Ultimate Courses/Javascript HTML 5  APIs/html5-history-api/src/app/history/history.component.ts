import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  public links!: NodeListOf<Element>;
  public readonly players: Player[] = PLAYERS;

  public ngOnInit(): void {
    // check if on base root
    if (location.pathname === '/') {
      // add data and append to the url using the replace state, it could also be pushState()
      const player: Player = PLAYERS[0];
      history.replaceState(player, '', player.id);

      // call the render state to browser
      this.render(player);
    }

    // this.setLinks(); this wont work till angular component is run
  }

  private render(state: Player): void {
    const info = document.querySelector('.info');

    if (info) {
      info.innerHTML = `
    <h3>${ state.name }</h3>
    <p>${ state.bio }</p>
    `;
    }
  }

  private setLinks() {
    const linksNode = document.querySelectorAll('.links a');
    // @ts-ignore
    this.links = [...linksNode];

    // loop through each anchor tag and remove the default behaviour of navigating
    this.links.forEach((link: any) => {
      link.addEventListener('click', (e: any) => {
        e.preventDefault();

        // get the id of the href
        const id = e.target.getAttribute('href').substring(1);
        const chosenPlayer: Player | undefined = PLAYERS.find((player: Player) => player.id === id);

        // add the push state to the history
        if (chosenPlayer) {
          history.pushState(chosenPlayer, '', chosenPlayer.id);
          this.render(chosenPlayer);
        }
      });
    });
  }

  // This method is used just to allow Angular to instantiate the component then we grab the values
  // and add remove the behaviour from the nav links
  public addLinks(): void {
    this.setLinks();
  }
}

export const PLAYERS: Player[] = [
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
