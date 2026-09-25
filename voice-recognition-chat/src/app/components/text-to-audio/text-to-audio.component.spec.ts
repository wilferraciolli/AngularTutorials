import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextToAudioComponent } from './text-to-audio.component';

describe('TextToAudioComponent', () => {
  let component: TextToAudioComponent;
  let fixture: ComponentFixture<TextToAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextToAudioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextToAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
