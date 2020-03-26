import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {FlightsService} from '../flights/flights.service';
import {Flight} from '../model/flight';

@Component({
  selector: 'app-buy-flight',
  templateUrl: './buy-flight.component.html',
  styleUrls: ['./buy-flight.component.css']
})
export class BuyFlightComponent implements OnInit {
  // Next line stops tslint complaining about the _ at the start of the variable name
  // tslint:disable-next-line
  _flights: Flight[];
  showBuyFlights = true;
  selectedFlight: Flight;
  originFilter: string = null;
  destinationFilter: string = null;
conversionRate = 4.0;


  constructor(private flightsService: FlightsService, private activatedRoute: ActivatedRoute ) {}

  onFilterChange(filterValue: string) {
    this.originFilter = filterValue;
  }

  onDestinationFilterChange(filterValue: string) {
    this.destinationFilter = filterValue;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (typeof params.origin !== 'undefined' ) {
        this.originFilter = params.origin;
      }
    });
    this._flights = this.flightsService.getFlights();
  }

  onClickBuyFlights() {
    this.showBuyFlights = !this.showBuyFlights;
  }

  get flights(): Flight[] {
    if (this.originFilter != null || this.destinationFilter != null) {
      return this._flights.map((flight) => {
        let match = true;
        if (this.originFilter != null) {
          match = flight.origin.startsWith(this.originFilter);
        }
        if (!match) {
          return null;
        }
        if (match && this.destinationFilter != null) {
          match = flight.destination.startsWith(this.destinationFilter);
          if (match) {
            return flight;
          } else {
            return null;
          }
        } else {
          return flight;
        }
        // the filter expression stops empty elements being returned (drops the null elements)
      }).filter(x => !!x);
    } else {
      return this._flights;
    }
  }


  onFlightClick(flight: Flight) {
    this.selectedFlight = flight;
  }
}

