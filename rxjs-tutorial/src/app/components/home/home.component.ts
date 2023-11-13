import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { from, interval, Observable, of, Subscriber, take } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatToolbarModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private agent$!: Observable<string>;
  public agent!: string;

  private agent2$!: Observable<number>;
  public agent2: string = '';

  // of() operator
  private students$: Observable<string[]> = of(['John', 'Jane', 'Doe']);
  public students: string[] = [];
  private student$: Observable<User> = of({ id: 1, name: 'John' });
  public student?: User;

  // from() operator
  private orders$: Observable<string> = from(['Order 1', 'Order 2', 'Order 3']);
  public orderName: string = '';

  public ngOnInit(): void {
    this.agent$ = this.createFirstCardObservable();
    this.agent2$ = interval(1000);

    // from operator
   this._createThirdObservable();

    this.agent$.subscribe((data: string) => {
      // console.log('data ', data);
      this.agent = data;
    });

    this.agent2$
        .pipe(take(3))
        .subscribe((index: number) => {
          // console.log('handling interval ', index);
          switch (index) {
            case 0:
              this.agent2 = 'First 2';
              break;
            case 1:
              this.agent2 = 'Second 2';
              break;
            case 2:
              this.agent2 = 'Third 2';
              break;
          }
        });

    // of() operator
    this.students$.subscribe((data: string[]) => {
      // console.log('data ', data);
      this.students = data;
    });
    this.student$.subscribe((data: User) => {
      // console.log('data ', data);
      this.student = data;
    });
  }

  private createFirstCardObservable() {
    return new Observable(
      function (observer: Subscriber<string>) {
        try {
          // simulate observable publishing values
          observer.next('First');

          setInterval(() => {
            observer.next('Second');
          }, 1000);

          setInterval(() => {
            observer.next('Third');
          }, 2000);
          observer.complete();
        } catch (e) {
          observer.error(e);
        }
        observer.complete();
      }
    );
  }

  private _createThirdObservable() {
    this.orders$.subscribe((data: string) => {
      this.orderName = data;
      // console.log('data from operator', data);
    });
  }
}

export interface User {
  id: number;
  name: string;
}
