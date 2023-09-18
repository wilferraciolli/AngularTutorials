import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarCharVerticalComponent } from './bar-char-vertical.component';

describe('BarCharVerticalComponent', () => {
  let component: BarCharVerticalComponent;
  let fixture: ComponentFixture<BarCharVerticalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarCharVerticalComponent]
    });
    fixture = TestBed.createComponent(BarCharVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
