import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent {
  private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

  /** Based on the screen size, switch from standard to one column per row */
  cards: Observable<Array<ICard>> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }): Array<ICard> => {
      if (matches) {
        console.log('matches');
        return [
          { title: 'Card 1', cols: 4, rows: 1 }, //summary
          { title: 'Card 2', cols: 4, rows: 1 }, //summary
          { title: 'Card 3', cols: 4, rows: 1 }, //summary
          { title: 'Card 4', cols: 4, rows: 1 }, //summary
          { title: 'Card 5', cols: 2, rows: 2 }, //chart
          { title: 'Card 6', cols: 2, rows: 2 }, //chart
          { title: 'Card 7', cols: 2, rows: 2 }, //chart
          { title: 'Card 8', cols: 2, rows: 2 }, //chart
          { title: 'Card 9', cols: 4, rows: 4 } // table
        ];
      }

      return [
        { title: 'Card 1', cols: 1, rows: 1 },//summary
        { title: 'Card 2', cols: 1, rows: 1 },//summary
        { title: 'Card 3', cols: 1, rows: 1 },//summary
        { title: 'Card 4', cols: 1, rows: 1 },//summary
        { title: 'Card 5', cols: 2, rows: 2 },//chart
        { title: 'Card 6', cols: 2, rows: 2 },//chart
        { title: 'Card 7', cols: 2, rows: 2 },//chart
        { title: 'Card 8', cols: 2, rows: 2 },//chart
        { title: 'Card 9', cols: 4, rows: 4 } // table
      ];
    })
  );
}

export interface ICard {
  title: string,
  cols: number,
  rows: number
}
