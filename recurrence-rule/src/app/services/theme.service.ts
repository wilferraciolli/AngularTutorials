import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'system';
    this.setTheme(savedTheme as 'light' | 'dark' | 'system');
  }

  setTheme(theme: 'light' | 'dark' | 'system') {
    localStorage.setItem('theme', theme);

    if (theme === 'system') {
      this.applySystemTheme();
      this.mediaQuery.onchange = () => this.applySystemTheme();
    } else {
      this.mediaQuery.onchange = null;
      this.toggleDarkClass(theme === 'dark');
    }
  }

  private applySystemTheme() {
    this.toggleDarkClass(this.mediaQuery.matches);
  }

  private toggleDarkClass(isDark: boolean) {
    const host = document.body;
    if (isDark) {
      this.renderer.addClass(host, 'dark-theme');
    } else {
      this.renderer.removeClass(host, 'dark-theme');
    }
  }
}
