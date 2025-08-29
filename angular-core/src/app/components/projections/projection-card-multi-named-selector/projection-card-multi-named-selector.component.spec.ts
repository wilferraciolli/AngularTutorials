import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionCardMultiNamedSelectorComponent } from './projection-card-multi-named-selector.component';

describe('ProjectionCardMultiNamedSelectorComponent', () => {
  let component: ProjectionCardMultiNamedSelectorComponent;
  let fixture: ComponentFixture<ProjectionCardMultiNamedSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectionCardMultiNamedSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectionCardMultiNamedSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
