import { Component, OnInit } from '@angular/core';
import {NavigationService} from '../services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private navService: NavigationService) { }

  ngOnInit(): void {
  }

  toggleSideNav(): void {
    this.navService.setShowNav(true);
  }

}
