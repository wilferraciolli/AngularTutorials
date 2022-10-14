import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

interface File {
  name: string,
  size: number,
  type: string
}

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['app.component.scss'],
  template: `
    <div>
      <div *ngFor="let file of files">
        <p>{{ file.name }}</p>
        <!-- Call the pipe on the file size and pass the suffix value -->
        <p>{{ file.size | filesize:' Megabytes' }}</p>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit {
  files: File[];

  ngOnInit() {
    this.files = [
      { name: 'logo.svg', size: 2120109, type: 'image/svg' },
      { name: 'banner.jpg', size: 18029, type: 'image/jpg' },
      { name: 'background.png', size: 1784562, type: 'image/png' }
    ];
  }
}
