import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtcDateTimeCustomFormComponent } from './utc-date-time-custom-form.component';

describe('UtcDateTimeCustomFormComponent', () => {
  let component: UtcDateTimeCustomFormComponent;
  let fixture: ComponentFixture<UtcDateTimeCustomFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtcDateTimeCustomFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UtcDateTimeCustomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
