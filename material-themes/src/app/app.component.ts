import {Component, inject} from '@angular/core';
import {MatDivider} from "@angular/material/divider";
import {MatAnchor, MatButton, MatFabButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {RouterOutlet} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogTemplateComponent} from "./dialog-template/dialog-template.component";
import {OverlayContainer} from "@angular/cdk/overlay";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatDivider, MatButton, MatAnchor, MatIcon, MatIconButton, MatFabButton, MatMiniFabButton, MatToolbar, MatToolbarRow, RouterOutlet, MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'material-themes';

  private dialogService: MatDialog = inject(MatDialog);
  private overlayService: OverlayContainer = inject(OverlayContainer);

  public toggleTheme(): void {
    if (document.body.classList.contains('dark-theme')) {
      // apply light theme to the container app
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');

      // apply light theme to overlay
      this.overlayService.getContainerElement().classList.add('light-theme');
    } else {
      // apply dark theme to container app
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');

      // apply dark theme overlay
      this.overlayService.getContainerElement().classList.add('dark-theme');
    }
  }

  public openDialog() {
    this.dialogService.open(DialogTemplateComponent, {
      width: '250px'
    })
  }
}
