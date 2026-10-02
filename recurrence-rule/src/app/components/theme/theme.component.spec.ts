import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ThemeComponent } from './theme.component';

describe('ThemeComponent', () => {
  let component: ThemeComponent;
  let fixture: ComponentFixture<ThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeComponent],
      providers: [provideAnimationsAsync()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update theme when onThemeChange is called', () => {
    component.onThemeChange('dark');
    expect(component.currentTheme).toBe('dark');
  });
});
