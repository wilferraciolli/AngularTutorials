import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { YearlyComponent } from './yearly.component';

describe('YearlyComponent', () => {
  let component: YearlyComponent;
  let fixture: ComponentFixture<YearlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearlyComponent],
      providers: [provideNoopAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
