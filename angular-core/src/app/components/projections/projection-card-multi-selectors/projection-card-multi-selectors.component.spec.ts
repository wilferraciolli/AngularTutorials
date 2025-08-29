import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionCardMultiSelectorsComponent } from './projection-card-multi-selectors.component';

describe('ProjectionCardMultiSelectorsComponent', () => {
  let component: ProjectionCardMultiSelectorsComponent;
  let fixture: ComponentFixture<ProjectionCardMultiSelectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectionCardMultiSelectorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectionCardMultiSelectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
