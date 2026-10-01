import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { Location } from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter(routes),
        provideNoopAnimations()
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'recurrence-rule' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('recurrence-rule');
  });

  it('should navigate to theme route', async () => {
    const router = TestBed.inject(Router);
    const location = TestBed.inject(Location);
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    await router.navigate(['theme']);
    expect(location.path()).toBe('/theme');
  });
});
