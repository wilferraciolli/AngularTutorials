import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiphyGif } from '../interfaces/giphy/giphy.interfaces';

@Component({
  selector: 'app-giphy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './giphy.component.html',
  styleUrl: './giphy.component.scss'
})
export class GiphyComponent {
  @Input() gif!: GiphyGif;
}
