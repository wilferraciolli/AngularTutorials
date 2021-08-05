import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  navItems = [
    { label: 'HOME', route: '/home'},
    { label: 'ABOUT', route: '/about'},
    { label: 'PORTFOLIO', route: '/portfolio'},
    { label: 'BLOG', route: '/blog'}
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onNavigationSelection(navItem: any): void {
    this.router.navigate([navItem.route]);
  }

}
