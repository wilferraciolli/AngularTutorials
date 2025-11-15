import {Component, signal, WritableSignal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {MatListItem} from "@angular/material/list";
import {NgForOf} from "@angular/common";
import {MatMenuModule} from "@angular/material/menu";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbar, MatIconButton, MatIcon, MatDrawerContainer, MatButton, MatDrawer, MatListItem, NgForOf, RouterLink, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public menus: WritableSignal<Array<string>> = signal([
    'angularHorizontalScroll',
    'swiperCardSliders',
    'swiperCardSlidersMultiple',
    'swiperCardCoverflow',
    'swiperCardCube',
    'swiperCardStack',
    'loadingCard'
  ]);
}
