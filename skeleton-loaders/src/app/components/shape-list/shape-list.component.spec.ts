import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeListComponent } from './shape-list.component';

describe('ShapeListComponent', () => {
  let component: ShapeListComponent;
  let fixture: ComponentFixture<ShapeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShapeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShapeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
