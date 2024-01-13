import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { elementAt, first, from, last, Observable } from 'rxjs';

@Component({
  selector: 'app-first',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    NgFor
  ],
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit {
  // create an observable to emit values
  public values: string[] = ['Small', 'Medium', 'Large'];
  public categories$: Observable<string> = from(this.values);

  public valueFirst: string = '';
  public valueLast: string = '';
  public valueElementAt: string = '';

  ngOnInit(): void {
    // subscribe to take first value
    this.categories$.pipe(
      first()
    ).subscribe((value: string) => {
      // console.log(value);
      this.valueFirst = value;
    });

    // subscribe to take last value
    this.categories$.pipe(
      last()
    ).subscribe((value: string) => {
      // console.log(value);
      this.valueLast = value;
    });

    // subscribe to get elemet at on starts with
    this.categories$.pipe(
      elementAt(1)
    ).subscribe((value: string) => {
      console.log(value);
      this.valueElementAt = value;
    });
  }

  public setElementAt(index: number): void {
    // subscribe again each time a button is clicked
    this.categories$.pipe(
      elementAt(index)
    ).subscribe((value: string) => {
      console.log(value);
      this.valueElementAt = value;
    });
  }
}
