import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullFormComponent } from './full-form.component';

describe('FullFormComponent', () => {
  let component: FullFormComponent;
  let fixture: ComponentFixture<FullFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
