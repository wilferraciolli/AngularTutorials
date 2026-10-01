import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { MonthlyComponent } from './monthly.component';

describe('MonthlyComponent', () => {
  let component: MonthlyComponent;
  let fixture: ComponentFixture<MonthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyComponent],
      providers: [provideNoopAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
