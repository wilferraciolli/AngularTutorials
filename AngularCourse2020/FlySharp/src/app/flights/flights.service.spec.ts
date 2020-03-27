import { TestBed, inject } from '@angular/core/testing';
import { FlightsService } from '../flights/flights.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {Flight} from '../model/flight';
import {FLIGHTS, MYFLIGHTS} from '../model/mock-flights';

describe('FlightsService', () => {

  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],

      providers: [FlightsService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
  });




  it('should be created', inject([FlightsService], (service: FlightsService) => {
    expect(service).toBeTruthy();
  }));

  it('should do somthing with HTTP!)', inject([FlightsService], (service: FlightsService) => {
    const testData: Flight[] = MYFLIGHTS;
    //
    // expect(service.getFlights().length).toBe(5);
    service.getFlights().subscribe((flights: Flight[]) => {
      expect(flights).toEqual(FLIGHTS); // verification happens once the req.flush method has been called
    });

    const req = httpTestingController.expectOne('http://localhost:8080/flightserver/allflights');
    req.flush(FLIGHTS); // Supply the data which will be returned

    httpTestingController.verify();
  }));



  it('should return 2 flights from getMyFlights()', inject([FlightsService], (service: FlightsService) => {
    expect(service.getMyFlights().length).toBe(2);
  }));
});
