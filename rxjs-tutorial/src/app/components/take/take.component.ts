import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { debounceTime, take, takeLast, takeWhile } from 'rxjs';

@Component({
  selector: 'app-take',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatToolbarModule, ReactiveFormsModule],
  templateUrl: './take.component.html',
  styleUrls: ['./take.component.scss']
})
export class TakeComponent implements OnInit {
  valueAssignedForTake: string = '';
  valueAssignedForTakeWhile: string = '';
  valueAssignedForTakeLast: string = '';


  private _formBuilder: FormBuilder = inject(FormBuilder);
  public searchForm: FormGroup = this._formBuilder.group({
    name: 'Search for take()',
    surname: 'Search for takeWhile()',
    address: 'Search for takeLast()'
  });

  public ngOnInit(): void {
    this.subscribeForTakeOperator();
    this.subscribeForTakeWhileOperator();
    this.subscribeForTakeLastOperator();
  }

  private subscribeForTakeOperator(): void {
    // subscribe and take the correct number of values
    this.searchForm.get('name')?.valueChanges
        .pipe(
          take(3)
        )
        .subscribe((data: string) => {
          console.log('Value entered take() ', data);
          this.valueAssignedForTake = data;
        });
  }

  private subscribeForTakeWhileOperator(): void {
    // subscribe and take only if the expression is true, in the case below only if the size of the value is at least 3 chars
    this.searchForm.get('surname')?.valueChanges
        .pipe(
          takeWhile((value: string) => value.length > 3)
        )
        .subscribe((data: string) => {
          console.log('Value entered takeWhile()', data);
          this.valueAssignedForTakeWhile = data;
        });
  }

  private subscribeForTakeLastOperator(): void {
    // subscribe and take last 2 values from the observable once it completed
    this.searchForm.get('address')?.valueChanges
        .pipe(
          take(3), // added here just to make it to complete once 3 values emit
          takeLast(2)
        )
        .subscribe((data: string) => {
          console.log('Value entered takeLast()', data);
          this.valueAssignedForTakeLast =  this.valueAssignedForTakeLast + ':' + data;
        });
  }

  public readValue(value: KeyboardEvent): void {
    // console.log(value);
  }
}
