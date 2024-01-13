import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { debounceTime, distinct, filter, first, from, Observable, skip , count} from 'rxjs';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatCardModule, MatDividerModule, MatToolbarModule, MatFormFieldModule,
    MatInputModule, ReactiveFormsModule
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  // create an observable to emit values
  public values: string[] = ['Small', 'Small', 'Medium', 'Medium', 'Large'];
  public categories$: Observable<string> = from(this.values);

  public valueAssigned: string = '';
  public distinctCount: number = 0;
  public skipCount: number = 0;
  public count: number = 0;

  private _formBuilder: FormBuilder = inject(FormBuilder);
  public searchForm: FormGroup = this._formBuilder.group({
    name: 'Type',
    surname: 'Distinct'
  });

  public ngOnInit(): void {
    // subscribe and test filter
    this.searchForm.get('name')?.valueChanges
        .pipe(
          filter((value: string) => this.checkCharCount(value))
        )
        .subscribe((data: string) => {
          console.log('Value entered after filter', data);
          this.valueAssigned = data;
        });

    // subscribe to test distinct
    this.categories$.pipe(
      distinct()
    ).subscribe((value: string) => {
      // console.log(value);
      this.distinctCount++;
    });

    // subscribe to test skip 3
    this.categories$.pipe(
      skip(3)
    ).subscribe((value: string) => {
      // console.log(value);
      this.skipCount++;
    });

    // subscribe to test count
    this.categories$.pipe(
      count()
    ).subscribe((value: number) => {
      // console.log(value);
      this.count = value;
    });
  }

  private checkCharCount(value: string): boolean {
    return value?.length < 10;
  }
}
