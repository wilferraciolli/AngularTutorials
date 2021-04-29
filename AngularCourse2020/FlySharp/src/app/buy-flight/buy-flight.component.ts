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
  errorMessage: string;
  originFilter: string = null;
  destinationFilter: string = null;
conversionRate = 4.0;

  nextFlightIndex = 20;
  numFlights = 0;

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


    const flightStream = this.flightsService.getChunkOfFlights(0, 20);
    flightStream.subscribe(
      (flights: Flight[]) => {this._flights = flights; console.log(this.flights); this.showBuyFlights = true; },
      (error: string) => this.errorMessage = error
    );

    // Get the number of flights available
    this.flightsService.getNumberOfFlights().subscribe(
      num => {console.log(num); this.numFlights = num; },
      (error: string) => this.errorMessage = error);
  }

  onClickBuyFlights() {
    this.showBuyFlights = !this.showBuyFlights;
  }


  onNext() {

    let numFlights = 20;
    if (this.nextFlightIndex + numFlights > this.numFlights) {
      numFlights = this.numFlights = this.numFlights; // Adjsust the number of flights so we don't try and load ones that are not available
    }
    this.flightsService.getChunkOfFlights(this.nextFlightIndex, numFlights).subscribe(
      (flights: Flight[]) => { this._flights = flights; this.showBuyFlights = true; },
      (error: string) => this.errorMessage = error);
    if (this.nextFlightIndex <= this.numFlights) {
      this.nextFlightIndex += 20; // Move the flightIndex on if there are more flights
    }
  }

  onPrevious() {
      // Don't load flights pre 0
    if (this.nextFlightIndex > 20) {
      this.nextFlightIndex -= 20;
    } else {
      this.nextFlightIndex = 0;
    }
    this.flightsService.getChunkOfFlights(this.nextFlightIndex, 20).subscribe(
      (flights: Flight[]) => { this._flights = flights; this.showBuyFlights = true; },
      (error: string) => this.errorMessage = error);
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

