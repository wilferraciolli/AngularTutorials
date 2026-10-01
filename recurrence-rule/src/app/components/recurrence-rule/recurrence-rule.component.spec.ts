import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { RecurrenceRuleComponent } from './recurrence-rule.component';

describe('RecurrenceRuleComponent', () => {
  let component: RecurrenceRuleComponent;
  let fixture: ComponentFixture<RecurrenceRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecurrenceRuleComponent],
      providers: [provideNoopAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurrenceRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
