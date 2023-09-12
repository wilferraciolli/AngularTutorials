import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoLocationComponent } from './geo-location.component';

describe('GeoLocationComponent', () => {
  let component: GeoLocationComponent;
  let fixture: ComponentFixture<GeoLocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeoLocationComponent]
    });
    fixture = TestBed.createComponent(GeoLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
