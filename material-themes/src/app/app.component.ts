import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatDivider} from "@angular/material/divider";
import {MatAnchor, MatButton, MatFabButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatDivider, MatButton, MatAnchor, MatIcon, MatIconButton, MatFabButton, MatMiniFabButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'material-themes';
}
