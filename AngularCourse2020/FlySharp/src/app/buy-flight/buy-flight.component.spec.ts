import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyFlightComponent } from './buy-flight.component';
import {FlightsService} from '../flights/flights.service';
import {Component, DebugElement, Input} from '@angular/core';
import {By} from '@angular/platform-browser';
import {Flight} from '../model/flight';
import {FLIGHTS, MYFLIGHTS} from '../model/mock-flights';
import {ActivatedRoute, Params} from '@angular/router';
import {from, Observable, of} from 'rxjs';


class MockFlightsService {

  constructor() { }

  public getFlights(): Flight[] {
    return FLIGHTS;
  }

  public getMyFlights(): Flight[] {
    return MYFLIGHTS;
  }
}

@Component({
  selector: 'app-payment',
  template: ''
})
class MockAppPaymentComponent {
  @Input()
  public selectedFlight: Flight;

}

@Component({
  selector: 'app-flight-filter',
  template: ''
})
class MockFlightFilterComponent {
  @Input()
  public label: string;
  @Input()
  public initialValue: string;
  public onFilterChange(flight: string) {}

}

const mockFlightsService = new MockFlightsService();

describe('BuyFlightComponent', () => {
  let component: BuyFlightComponent;
  let fixture: ComponentFixture<BuyFlightComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyFlightComponent, MockAppPaymentComponent, MockFlightFilterComponent ],
      providers: [{
                    provide: FlightsService,
                    useValue: mockFlightsService
                  },
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{id: 1}]),
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default showBuyFlights to true', () => {
    expect(component.showBuyFlights).toBeTruthy();
  });

  it('should set showBuyFlights to false when onClickBuyFlights() is called', () => {
    component.onClickBuyFlights();
    expect(component.showBuyFlights).toBeFalsy();
  });

  it('should set showBuyFlights to false when onClickBuyFlights() is called', () => {
    component.onClickBuyFlights();
    component.onClickBuyFlights();
    expect(component.showBuyFlights).toBeTruthy();
  });

  it('should set showBuyFlights to false when the link is clicked', () => {
    el = fixture.debugElement.query(By.css('a'));
    el.triggerEventHandler('click', null);
    expect(component.showBuyFlights).toBeFalsy();
  });

  it('should hide the flights table  when the link is clicked', () => {
    fixture.detectChanges();
    let tableEle = fixture.debugElement.query(By.css('table'));
    expect(tableEle).toBeTruthy();
    el = fixture.debugElement.query(By.css('a'));
    el.triggerEventHandler('click', null);
    fixture.detectChanges();
    tableEle = fixture.debugElement.query(By.css('table'));
    expect(tableEle).toBeFalsy();
  });
});
