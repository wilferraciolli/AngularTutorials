import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderUseValueComponent } from './provider-use-value.component';

describe('ProviderUseValueComponent', () => {
  let component: ProviderUseValueComponent;
  let fixture: ComponentFixture<ProviderUseValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderUseValueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProviderUseValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
