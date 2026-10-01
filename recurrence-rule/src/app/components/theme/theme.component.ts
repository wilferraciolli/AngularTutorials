import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'wt-theme',
  imports: [
    MatIcon,
    MatButtonToggleGroup,
    MatButtonToggle
  ],
  standalone: true,
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss'
})
export class ThemeComponent implements OnInit {
  currentTheme: string = 'system';

  constructor(public themeService: ThemeService) {}

  ngOnInit() {
    this.currentTheme = localStorage.getItem('theme') || 'system';
  }

  onThemeChange(theme: 'light' | 'dark' | 'system') {
    this.currentTheme = theme;
    this.themeService.setTheme(theme);
  }
}
