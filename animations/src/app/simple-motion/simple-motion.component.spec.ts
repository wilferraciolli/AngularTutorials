import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleMotionComponent } from './simple-motion.component';

describe('SimpleMotionComponent', () => {
  let component: SimpleMotionComponent;
  let fixture: ComponentFixture<SimpleMotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleMotionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimpleMotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
