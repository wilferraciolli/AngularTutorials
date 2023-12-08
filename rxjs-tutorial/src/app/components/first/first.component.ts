import {
  logBuilderStatusWarnings
} from '@angular-devkit/build-angular/src/builders/browser-esbuild/builder-status-warnings';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { first, from, last, Observable } from 'rxjs';

@Component({
  selector: 'app-first',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatToolbarModule, ReactiveFormsModule],
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit {
  // create an observable to emit values
  public values: string[] = ['Small', 'Medium', 'Large'];
  public categories$: Observable<string> = from(this.values);

  public valueFirst: string = '';
  public valueLast: string = '';


  ngOnInit(): void {
    // subscribe to take first value
    this.categories$.pipe(
      first()
    ).subscribe((value: string) => {
      console.log(value);
      this.valueFirst = value;
    });

    // subscribe to take last value
    this.categories$.pipe(
      last()
    ).subscribe((value: string) => {
      console.log(value);
      this.valueLast = value;
    });

  }
}
