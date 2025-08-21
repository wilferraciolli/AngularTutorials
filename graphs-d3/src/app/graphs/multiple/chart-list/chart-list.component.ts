import { Component } from '@angular/core';

const DATA: any[] = [
  {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
  {"Framework": "React", "Stars": "150793", "Released": "2013"},
  {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
  {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
  {"Framework": "Ember", "Stars": "21471", "Released": "2011"}
];

@Component({
    selector: 'app-chart-list',
    templateUrl: './chart-list.component.html',
    styleUrls: ['./chart-list.component.scss'],
    standalone: false
})
export class ChartListComponent {

}
