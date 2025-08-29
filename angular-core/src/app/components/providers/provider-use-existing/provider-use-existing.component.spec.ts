import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderUseExistingComponent } from './provider-use-existing.component';

describe('ProviderUseExistingComponent', () => {
  let component: ProviderUseExistingComponent;
  let fixture: ComponentFixture<ProviderUseExistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderUseExistingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProviderUseExistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
