import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private http:HttpClient = inject(HttpClient);

  get(userId?: number): Observable<Post[]> {
    if (userId == 100) {
      return throwError(() => new Error('User not found'));
    }

    return this.http
               .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
                 params: {
                   ...(userId ? { userId: userId.toString() } : {})
                 }
               })
               .pipe(delay(1000));
  }
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
