import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcComponent } from './arc.component';

describe('ArcComponent', () => {
  let component: ArcComponent;
  let fixture: ComponentFixture<ArcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArcComponent]
    });
    fixture = TestBed.createComponent(ArcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
