import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistogramChartWrapComponent } from './histogram-chart-wrap.component';

describe('HistogramChartWrapComponent', () => {
  let component: HistogramChartWrapComponent;
  let fixture: ComponentFixture<HistogramChartWrapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistogramChartWrapComponent]
    });
    fixture = TestBed.createComponent(HistogramChartWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
