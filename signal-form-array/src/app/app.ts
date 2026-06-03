import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {RouterOutlet, RouterLink} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ThemeService} from './services/theme.service';

type ThemeMode = 'light' | 'dark';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  private readonly _themeService: ThemeService = inject(ThemeService);

  protected readonly title = signal('Signal Forms');
  protected readonly isDark = this._themeService.isDark;

  constructor() {
    // const theme: string | null = localStorage.getItem('theme');
    // if (theme) {
    //   this.isDark.set(true);
    //   this._setDarkMode();
    // }
  }

  protected toggleDarkMode(): void {
  this._themeService.toggleTheme();
  }

  // protected toggleDarkMode(): void {
  //   this._setDarkMode();
  //   const isDarkTheme = document.body.classList.contains('dark-mode');
  //
  //   if (isDarkTheme) {
  //     this.isDark.set(true);
  //     localStorage.setItem('theme', 'dark');
  //   } else {
  //     this.isDark.set(false);
  //     localStorage.removeItem('theme');
  //   }
  // }
  //
  // private _setDarkMode(): void {
  //   document.body.classList.toggle('dark-mode');
  // }
}
