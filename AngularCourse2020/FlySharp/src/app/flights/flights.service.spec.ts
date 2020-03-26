import { TestBed, inject } from '@angular/core/testing';
import { FlightsService } from '../flights/flights.service';

describe('FlightsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlightsService]
    });
  });

  it('should be created', inject([FlightsService], (service: FlightsService) => {
    expect(service).toBeTruthy();
  }));

  it('should return 5 flights from getFlights()', inject([FlightsService], (service: FlightsService) => {
    expect(service.getFlights().length).toBe(5);
  }));

  it('should return 2 flights from getMyFlights()', inject([FlightsService], (service: FlightsService) => {
    expect(service.getMyFlights().length).toBe(2);
  }));
});
