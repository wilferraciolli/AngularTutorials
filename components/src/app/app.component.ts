import {Component, signal, WritableSignal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {MatListItem} from "@angular/material/list";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbar, MatIconButton, MatIcon, MatDrawerContainer, MatButton, MatDrawer, MatListItem, NgForOf, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public menus: WritableSignal<Array<string>> = signal([
    'cardSliders'
  ]);
}
