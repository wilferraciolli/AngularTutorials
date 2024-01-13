import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HigherOrderMapsComponent } from './higher-order-maps.component';

describe('HigherOrderMapsComponent', () => {
  let component: HigherOrderMapsComponent;
  let fixture: ComponentFixture<HigherOrderMapsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HigherOrderMapsComponent]
    });
    fixture = TestBed.createComponent(HigherOrderMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
