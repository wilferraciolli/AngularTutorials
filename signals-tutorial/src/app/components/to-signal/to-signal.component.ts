import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Post, PostService } from '../../services/post.service';

@Component({
  selector: 'app-to-signal',
  standalone: true,
  imports: [
    CommonModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatOptionModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './to-signal.component.html',
  styleUrls: ['./to-signal.component.scss']
})
export class ToSignalComponent {
  private postsService: PostService = inject(PostService);

  public posts: Signal<Post[] | undefined> = toSignal(this.postsService.get());

}
