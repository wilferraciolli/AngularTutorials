import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossFieldForm } from './cross-field-form';

describe('CrossFieldForm', () => {
  let component: CrossFieldForm;
  let fixture: ComponentFixture<CrossFieldForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrossFieldForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrossFieldForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
