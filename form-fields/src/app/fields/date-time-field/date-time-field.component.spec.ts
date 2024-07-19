import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeFieldComponent } from './date-time-field.component';

describe('DateTimeFieldComponent', () => {
  let component: DateTimeFieldComponent;
  let fixture: ComponentFixture<DateTimeFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateTimeFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DateTimeFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
