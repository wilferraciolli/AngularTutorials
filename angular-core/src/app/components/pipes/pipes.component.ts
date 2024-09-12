import {
  AsyncPipe,
  CurrencyPipe,
  DatePipe,
  DecimalPipe, JsonPipe,
  LowerCasePipe, NgIf,
  PercentPipe,
  UpperCasePipe
} from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { interval, map, Observable, of, take } from 'rxjs';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

export interface IUser {
  id: string;
  username: string;
  paswword: string;
}

@Component({
  selector: 'app-pipes',
  standalone: true,
  imports: [
    MatCardModule, MatDivider, MatButton, DatePipe, UpperCasePipe, LowerCasePipe, CurrencyPipe, DecimalPipe,
    PercentPipe, AsyncPipe, NgIf, JsonPipe, TranslatePipe
  ],
  templateUrl: './pipes.component.html',
  styleUrl: './pipes.component.scss'
})
export class PipesComponent {
  public $values: Observable<number> = interval(1)
  .pipe(
    take(3),
    map(v => v + 1)
  );

  public $user: Observable<IUser | null> = of(null);

  public addUser(): void {
    this.$user.subscribe(v => this.$user = of({
      id: 'userId',
      username: 'username',
      paswword: 'somePass'
    }))
  }

  public removeUserr(): void {
    this.$user.subscribe(v => this.$user = of(null))
  }
}
