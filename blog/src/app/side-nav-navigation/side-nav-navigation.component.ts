import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-side-nav-navigation',
  templateUrl: './side-nav-navigation.component.html',
  styleUrls: ['./side-nav-navigation.component.scss']
})
export class SideNavNavigationComponent implements OnInit {

  navItems = [
    { label: 'HOME', route: '/home'},
    { label: 'ABOUT', route: '/about'},
    { label: 'PORTFOLIO', route: '/portfolio'},
    { label: 'BLOG', route: '/blog'}
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate(): void {

  }
  onNavigationSelection(navItem: any): void {
    this.router.navigate([navItem.route]);
  }
}
