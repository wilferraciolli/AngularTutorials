import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-debounce-time',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatToolbarModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './debounce-time.component.html',
  styleUrls: ['./debounce-time.component.scss']
})
export class DebounceTimeComponent implements OnInit {
  valueAssigned: string = '';

  private _formBuilder: FormBuilder = inject(FormBuilder);
  public searchForm: FormGroup = this._formBuilder.group({
    name: 'Search for'
  });


  public ngOnInit(): void {
    // subscribe and wait for the debounce time
    this.searchForm.get('name')?.valueChanges
        .pipe(
          debounceTime(1000)
        )
        .subscribe((data: string) => {
          console.log('Value entered after debounce', data);
          this.valueAssigned = data;
        });
  }

  public readValue(value: KeyboardEvent): void {
    // console.log(value);
  }
}
