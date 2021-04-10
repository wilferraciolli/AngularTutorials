import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-course-dialogue',
  templateUrl: './course-dialogue.component.html',
  styleUrls: ['./course-dialogue.component.scss']
})
export class CourseDialogueComponent implements OnInit {

  form: FormGroup;
  description: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {

    this.description = data.description;
    this.form = fb.group({
      description: [data.description, Validators.required]
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      description: [this.description, []],
      // ...
    });
  }

  save(): void {
    this.dialogRef.close(this.form.value);
  }

  close(): void {
    this.dialogRef.close();
  }

}
