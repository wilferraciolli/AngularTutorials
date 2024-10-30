import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationListComponent } from './animation-list.component';

describe('AnimationListComponent', () => {
  let component: AnimationListComponent;
  let fixture: ComponentFixture<AnimationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
