import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutChartWrapComponent } from './donut-chart-wrap.component';

describe('DonutChartWrapComponent', () => {
  let component: DonutChartWrapComponent;
  let fixture: ComponentFixture<DonutChartWrapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonutChartWrapComponent]
    });
    fixture = TestBed.createComponent(DonutChartWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
