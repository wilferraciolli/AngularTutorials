import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderUseClassComponent } from './provider-use-class.component';

describe('ProviderUseClassComponent', () => {
  let component: ProviderUseClassComponent;
  let fixture: ComponentFixture<ProviderUseClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderUseClassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProviderUseClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
