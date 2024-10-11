import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateChangeComponent } from './state-change.component';

describe('EnabledDisabledComponent', () => {
  let component: StateChangeComponent;
  let fixture: ComponentFixture<StateChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateChangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
