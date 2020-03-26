import { Component, OnInit, Input } from '@angular/core';
import {Flight} from '../model/flight';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  // Next line stops tslint complaining about the _ at the start of the variable name
  // tslint:disable-next-line
  private _selectedFlight: Flight;

  get selectedFlight(): Flight {
    return this._selectedFlight;
  }
  @Input()
  set selectedFlight(value: Flight) {
    this._selectedFlight = value;
  }


  constructor() { }

  ngOnInit() {
  }

}
