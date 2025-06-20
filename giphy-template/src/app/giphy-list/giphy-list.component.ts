import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-giphy-list',
  imports: [MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './giphy-list.component.html',
  styleUrl: './giphy-list.component.scss'
})
export class GiphyListComponent {
  searchTerm = '';
}
