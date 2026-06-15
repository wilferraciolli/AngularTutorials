import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  computed,
  effect,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';

type ThemeMode = 'light' | 'dark';

const THEME_STORAGE_KEY = 'app-theme-mode';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly mode = signal<ThemeMode>(this.getInitialTheme());

  readonly isDark = computed(() => this.mode() === 'dark');
  readonly currentTheme = this.mode.asReadonly();

  constructor() {
    effect(() => {
      const mode = this.mode();

      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      const root = this.document.documentElement;

      root.classList.toggle('dark-theme', mode === 'dark');
      root.classList.toggle('light-theme', mode === 'light');

      localStorage.setItem(THEME_STORAGE_KEY, mode);
    });
  }

  toggleTheme(): void {
    this.mode.update((mode) => (mode === 'dark' ? 'light' : 'dark'));
  }

  setTheme(mode: ThemeMode): void {
    this.mode.set(mode);
  }

  private getInitialTheme(): ThemeMode {
    if (!isPlatformBrowser(this.platformId)) {
      return 'light';
    }

    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    return prefersDark ? 'dark' : 'light';
  }
}
