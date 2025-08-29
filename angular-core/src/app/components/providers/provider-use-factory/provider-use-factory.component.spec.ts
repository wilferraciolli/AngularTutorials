import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderUseFactoryComponent } from './provider-use-factory.component';

describe('ProviderUseFactoryComponent', () => {
  let component: ProviderUseFactoryComponent;
  let fixture: ComponentFixture<ProviderUseFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderUseFactoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProviderUseFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
