import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionCardComponent } from './projection-card.component';

describe('ProjectionCardComponent', () => {
  let component: ProjectionCardComponent;
  let fixture: ComponentFixture<ProjectionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectionCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
