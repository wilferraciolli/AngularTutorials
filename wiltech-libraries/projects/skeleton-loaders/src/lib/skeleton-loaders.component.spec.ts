import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonLoadersComponent } from './skeleton-loaders.component';

describe('SkeletonLoadersComponent', () => {
  let component: SkeletonLoadersComponent;
  let fixture: ComponentFixture<SkeletonLoadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonLoadersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkeletonLoadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
