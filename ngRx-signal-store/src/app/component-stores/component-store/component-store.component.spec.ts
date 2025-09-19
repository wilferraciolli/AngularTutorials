import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentStoreComponent } from './component-store.component';

describe('ComponentStoreComponent', () => {
  let component: ComponentStoreComponent;
  let fixture: ComponentFixture<ComponentStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentStoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponentStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
