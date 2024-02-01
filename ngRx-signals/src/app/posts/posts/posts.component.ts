import { CommonModule } from '@angular/common';
import { Component, computed, inject, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { patchState, signalState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { PostStateInterface } from '../interfaces/post-state.interface';
import { PostInterface } from '../interfaces/post.interface';
import { PostService } from '../services/post.service';

export const PostStore = signalStore(
  withState<PostStateInterface>({
    posts: [],
    error: null,
    isLoading: false
  }),
  withComputed(store => ({
    postsCount: computed(() => store.posts().length)
  })),
  withMethods((store, postsService = inject(PostService)) => ({
    addPost(title: string) {
      const newPost: PostInterface = {
        id: crypto.randomUUID(),
        title,
      };
      const updatedPosts: PostInterface[] = [...store.posts(), newPost];
      patchState(store, { posts: updatedPosts });
    },
    removePost(id: string) {
      const updatedPosts = store.posts().filter((post) => post.id !== id);
      patchState(store, { posts: updatedPosts });
    },
    addPosts(posts: PostInterface[]) {
      patchState(store, { posts });
    },
    loadPosts: rxMethod<void>(
      pipe(
        switchMap(() => {
          return postsService.getPosts().pipe(
            tap((posts) => {
              patchState(store, { posts });
            })
          );
        })
      )
    ),
  })),
  withHooks({
    onInit(store) {
      store.loadPosts();
    },
  })
);

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [PostStore],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {

  public store = inject(PostStore);
  public fb: FormBuilder = inject(FormBuilder);
  public addForm: FormGroup = this.fb.nonNullable.group({
    title: ''
  });

  private _postService: PostService = inject(PostService);

  public onAdd(): void {
    this.store.addPost(this.addForm.getRawValue().title);
    this.addForm.reset();
  }
}
