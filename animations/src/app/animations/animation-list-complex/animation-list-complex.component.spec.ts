import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationListComplexComponent } from './animation-list-complex.component';

describe('AnimationListComplexComponent', () => {
  let component: AnimationListComplexComponent;
  let fixture: ComponentFixture<AnimationListComplexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimationListComplexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimationListComplexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
