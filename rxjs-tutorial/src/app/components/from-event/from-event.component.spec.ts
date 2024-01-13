import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromEventComponent } from './from-event.component';

describe('FromEventComponent', () => {
  let component: FromEventComponent;
  let fixture: ComponentFixture<FromEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FromEventComponent]
    });
    fixture = TestBed.createComponent(FromEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
