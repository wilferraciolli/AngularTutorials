import { Component } from '@angular/core';

@Component({
    selector: 'app-bar-chart-vertical-wrap',
    templateUrl: './bar-chart-vertical-wrap.component.html',
    styleUrls: ['./bar-chart-vertical-wrap.component.scss'],
    standalone: false
})
export class BarChartVerticalWrapComponent {
  // @ts-ignore
  data: { name: string, series: { name: string, value: number }[] }[];
  barColor: string[] = ['#a9ce97', '#a5b5de'];
  domain: number[] = [100, 1000];

  constructor() {
    this.data = [
      {
        name: 'Row1',
        series: [
          {name: 'Bar1', value: 150},
          {name: 'Bar2', value: 200}
        ],
      },
      {
        name: 'Row2',
        series: [
          {name: 'Bar1', value: 300},
          {name: 'Bar2', value: 400}
        ],
      },
      {
        name: 'Row3',
        series: [
          {name: 'Bar1', value: 500},
          {name: 'Bar2', value: 1000}
        ],
      }
    ];
  }

}
