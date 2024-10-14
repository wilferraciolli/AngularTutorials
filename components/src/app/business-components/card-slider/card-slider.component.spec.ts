import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSliderComponent } from './card-slider.component';

describe('CardSliderComponent', () => {
  let component: CardSliderComponent;
  let fixture: ComponentFixture<CardSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
