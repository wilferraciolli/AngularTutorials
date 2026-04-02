import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayForm } from './array-form';

describe('ArrayForm', () => {
  let component: ArrayForm;
  let fixture: ComponentFixture<ArrayForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrayForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrayForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
