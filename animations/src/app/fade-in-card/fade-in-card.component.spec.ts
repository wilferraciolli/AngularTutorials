import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FadeInCardComponent } from './fade-in-card.component';

describe('FadeInCardComponent', () => {
  let component: FadeInCardComponent;
  let fixture: ComponentFixture<FadeInCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FadeInCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FadeInCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
