import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

export interface ILink {
  label: string;
  link: string;
  index: number;
}

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatTabsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  public links: ILink[] = [
    {
      label: 'Pipes',
      link: '/pipes',
      index: 0
    },
    {
      label: 'Directives',
      link: '/directives',
      index: 1
    },
    {
      label: 'Routing',
      link: '/routing',
      index: 2
    },
    {
      label: 'Providers',
      link: '/providers',
      index: 3
    },
    {
      label: 'Projection',
      link: '/projection',
      index: 4
    }
  ];
  // public activeLink: string = this.links[1].label;
  public activeLinkIndex: number = 3;
}
