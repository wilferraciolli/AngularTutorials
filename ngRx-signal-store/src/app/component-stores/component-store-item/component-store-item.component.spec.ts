import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentStoreItemComponent } from './component-store-item.component';

describe('ComponentStoreItemComponent', () => {
  let component: ComponentStoreItemComponent;
  let fixture: ComponentFixture<ComponentStoreItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentStoreItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentStoreItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
