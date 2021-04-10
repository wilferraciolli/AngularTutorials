import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseDialogueComponent } from './shared/components/course-dialogue/course-dialogue.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  returnedData: any;

  constructor(private dialog: MatDialog) {
  }

  openDialog(): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };

    // open dialog
    // this.dialog.open(CourseDialogueComponent, dialogConfig);

    // get data returned from dialog
    const dialogRef = this.dialog.open(CourseDialogueComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        this.returnedData = data.description;
        console.log('Dialog output:', data);
      }
    );
  }
}
