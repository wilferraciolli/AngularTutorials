import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsplashListComponent } from './unsplash-list.component';

describe('UnsplashListComponent', () => {
  let component: UnsplashListComponent;
  let fixture: ComponentFixture<UnsplashListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsplashListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnsplashListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
