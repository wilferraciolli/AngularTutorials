import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-flight-filter',
  templateUrl: './flight-filter.component.html',
  styleUrls: ['./flight-filter.component.css']
})
export class FlightFilterComponent implements OnInit {

  @Input()
  label: string;

  @Input()
  initialValue: string;

  @Output()
  filterEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onFilterEnter( filterValue: string) {
    this.filterEmitter.emit(filterValue);

  }

}
