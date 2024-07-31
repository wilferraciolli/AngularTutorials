import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DirectivesComponent } from '../../../components/directives/directives.component';
import { PipesComponent } from '../../../components/pipes/pipes.component';

export interface ILink {
  label: string;
  link: string;
  index: number;
}

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatTabsModule, PipesComponent, DirectivesComponent, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  private _router: Router = inject(Router);

  // public links: string[] = ['Pipes', 'Directives', 'Routing', 'Providers'];
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
    }
  ];
  // public activeLink: string = this.links[1].label;
  public activeLinkIndex: number = 1;
}
