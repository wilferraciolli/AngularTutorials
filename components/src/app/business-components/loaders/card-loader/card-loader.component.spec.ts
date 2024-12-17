import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLoaderComponent } from './card-loader.component';

describe('CardLoaderComponent', () => {
  let component: CardLoaderComponent;
  let fixture: ComponentFixture<CardLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
