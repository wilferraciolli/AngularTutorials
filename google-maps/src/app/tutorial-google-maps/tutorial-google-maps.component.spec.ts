import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialGoogleMapsComponent } from './tutorial-google-maps.component';

describe('TutorialGoogleMapsComponent', () => {
  let component: TutorialGoogleMapsComponent;
  let fixture: ComponentFixture<TutorialGoogleMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialGoogleMapsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialGoogleMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
