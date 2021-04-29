import { Component } from '@angular/core';
import {DialogInterface} from './components/shared/dialog/dialog.interface';
import {DialogComponent} from './components/shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public dialogSubmissionMessage = '';

  constructor(public dialog: MatDialog) {}

  /**
   * This method invokes the first dialog
   */
  openDialogOne(): void {
    const dialogInterface: DialogInterface = {
      dialogHeader: 'I am created by Reusable dialog',
      dialogContent: 'I am first dialog',
      cancelButtonLabel: 'Cancel',
      confirmButtonLabel: 'Submit',
      callbackMethod: () => {
        this.performDialogSubmitMethodOne();
      },
    };
    this.dialog.open(DialogComponent, {
      width: '300px',
      data: dialogInterface,
    });
  }

  /**
   * This method invokes the second dialog
   */
  openDialogTwo(): void {
    const dialogInterface: DialogInterface = {
      dialogHeader: 'I am created by Reusable dialog',
      dialogContent: 'I am second dialog',
      cancelButtonLabel: 'Cancel',
      confirmButtonLabel: 'Submit',
      callbackMethod: () => {
        this.performDialogSubmitMethodTwo();
      },
    };
    this.dialog.open(DialogComponent, {
      width: '300px',
      data: dialogInterface,
    });
  }

  performDialogSubmitMethodOne(): void {
    this.dialogSubmissionMessage = 'The dialog submitted from the Dialog ONE';
  }

  performDialogSubmitMethodTwo(): void {
    this.dialogSubmissionMessage = 'The dialog submitted from the Dialog TWO';
  }
}
