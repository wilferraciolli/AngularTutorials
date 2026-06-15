import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicSampleForm } from './dynamic-sample-form';

describe('DynamicSampleForm', () => {
  let component: DynamicSampleForm;
  let fixture: ComponentFixture<DynamicSampleForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicSampleForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicSampleForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
