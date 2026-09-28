import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtcDateTimeCustomFieldComponent } from './utc-date-time-custom-field.component';

describe('UtcDateTimeCustomFieldComponent', () => {
  let component: UtcDateTimeCustomFieldComponent;
  let fixture: ComponentFixture<UtcDateTimeCustomFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtcDateTimeCustomFieldComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UtcDateTimeCustomFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
