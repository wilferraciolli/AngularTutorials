import {Component} from '@angular/core';
import {MatDivider} from "@angular/material/divider";
import {MatAnchor, MatButton, MatFabButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {RouterOutlet} from "@angular/router";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatDialog} from "@angular/material/dialog";
import {inject} from "@angular/core";
import {DialogTemplateComponent} from "./dialog-template/dialog-template.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatDivider, MatButton, MatAnchor, MatIcon, MatIconButton, MatFabButton, MatMiniFabButton, MatToolbar, MatToolbarRow, RouterOutlet, MatSlideToggle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'material-themes';

  public dialogService: MatDialog = inject(MatDialog);

  public toggleTheme(): void {
    if (document.body.classList.contains('dark-theme')) {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    }
  }

  public openDialog(){
    this.dialogService.open(DialogTemplateComponent, {
      width: '250px'
    })
  }
}
