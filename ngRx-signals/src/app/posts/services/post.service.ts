import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { PostInterface } from '../interfaces/post.interface';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  public getPosts(): Observable<PostInterface[]> {
    const posts: PostInterface[] = [
      { id: '1', title: 'First post' },
      { id: '2', title: 'Second post' },
      { id: '3', title: 'Third post' }
    ];
    return of(posts).pipe(delay(2000));
  }
}
