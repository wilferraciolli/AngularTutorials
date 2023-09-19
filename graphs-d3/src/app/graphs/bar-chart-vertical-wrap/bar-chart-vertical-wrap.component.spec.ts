import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartVerticalWrapComponent } from './bar-chart-vertical-wrap.component';

describe('BarChartVerticalWrapComponent', () => {
  let component: BarChartVerticalWrapComponent;
  let fixture: ComponentFixture<BarChartVerticalWrapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarChartVerticalWrapComponent]
    });
    fixture = TestBed.createComponent(BarChartVerticalWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
