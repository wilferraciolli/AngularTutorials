import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-flight-filter',
  templateUrl: './flight-filter.component.html',
  styleUrls: ['./flight-filter.component.css']
})
export class FlightFilterComponent implements OnInit {

  @Input()
  label: string;

  // Next line stops tslint complaining about the _ at the start of the variable name
  // tslint:disable-next-line
  private _initialValue = '';

  get initialValue(): string {
    return this._initialValue;
  }
  @Input()
  set initialValue(value: string) {
    if (value != null) {
      this._initialValue = value;
    }
  }


  @Output()
  filterEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }


  onFilterEnter( filterValue: string) {
    this.filterEmitter.emit(filterValue);

  }

}
