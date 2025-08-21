import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionComponent } from './projection.component';

describe('ProjectionComponent', () => {
  let component: ProjectionComponent;
  let fixture: ComponentFixture<ProjectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
