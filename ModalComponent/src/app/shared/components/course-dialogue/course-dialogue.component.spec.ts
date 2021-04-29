import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDialogueComponent } from './course-dialogue.component';

describe('CourseDialogueComponent', () => {
  let component: CourseDialogueComponent;
  let fixture: ComponentFixture<CourseDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
