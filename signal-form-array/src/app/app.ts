import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {RouterOutlet, RouterLink} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

type ThemeMode = 'light' | 'dark';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected readonly title = signal('Signal Forms');
  protected readonly isDark = signal(false);

  constructor() {
    const theme: string | null = localStorage.getItem('theme');
    if (theme) {
      this.isDark.set(true);
      this._setDarkMode();
    }
  }

  protected toggleDarkMode(): void {
    this._setDarkMode();
    const isDarkTheme = document.body.classList.contains('dark-mode');

    if (isDarkTheme) {
      this.isDark.set(true);
      localStorage.setItem('theme', 'dark');
    } else {
      this.isDark.set(false);
      localStorage.removeItem('theme');
    }
  }

  private _setDarkMode(): void {
    document.body.classList.toggle('dark-mode');
  }
}
