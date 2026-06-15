import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDetails } from './error-details';

describe('ErrorDetails', () => {
  let component: ErrorDetails;
  let fixture: ComponentFixture<ErrorDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
