import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PipesComponent } from '../../../components/pipes/pipes.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatTabsModule, PipesComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

}
