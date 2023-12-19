import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Post, PostService } from '../../services/post.service';

@Component({
  selector: 'app-to-signal',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatProgressSpinnerModule, MatAutocompleteModule],
  templateUrl: './to-signal.component.html',
  styleUrls: ['./to-signal.component.scss']
})
export class ToSignalComponent {
  private postsService: PostService = inject(PostService);

  public posts: Signal<Post[] | undefined> = toSignal(this.postsService.get());

}
