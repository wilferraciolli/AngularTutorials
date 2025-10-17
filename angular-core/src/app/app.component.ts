import { Component, inject } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatIcon, MatIconButton, NavBarComponent, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private _router: Router = inject(Router);

  public title: string = 'angular-core';

  public navigateTo(path: string): void {
    this._router.navigate([`/${path}`]);
  }
}
