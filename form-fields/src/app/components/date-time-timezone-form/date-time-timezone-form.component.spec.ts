import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeTimezoneFormComponent } from './date-time-timezone-form.component';

describe('DateTimeTimezoneFormComponent', () => {
  let component: DateTimeTimezoneFormComponent;
  let fixture: ComponentFixture<DateTimeTimezoneFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateTimeTimezoneFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DateTimeTimezoneFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
