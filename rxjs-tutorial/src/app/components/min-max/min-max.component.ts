import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { from, max, min, Observable } from 'rxjs';

@Component({
  selector: 'app-min-max',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatDividerModule, MatToolbarModule],
  templateUrl: './min-max.component.html',
  styleUrls: ['./min-max.component.scss']
})
export class MinMaxComponent implements OnInit {
  public values: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  public number$: Observable<number> = from(this.values);

  public minValue: number = 0;
  public maxValue: number = 0;

  public ngOnInit(): void {
    // subscribe to get min
    this.number$.pipe(
      min()
    ).subscribe((value: number) => {
      console.log('value emitted ', value);
      this.minValue = value;
    });


    // subscribe to get max
    this.number$.pipe(
      max()
    ).subscribe((value: number) => {
      console.log('value emitted ', value);
      this.maxValue = value;
    });
  }
}
