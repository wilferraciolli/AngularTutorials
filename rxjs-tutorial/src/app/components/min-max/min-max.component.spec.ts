import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinMaxComponent } from './min-max.component';

describe('MinMaxComponent', () => {
  let component: MinMaxComponent;
  let fixture: ComponentFixture<MinMaxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MinMaxComponent]
    });
    fixture = TestBed.createComponent(MinMaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
