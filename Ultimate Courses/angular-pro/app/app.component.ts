import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FilesizePipe } from './filesize.pipe';

interface File {
  name: string,
  size: any,
  type: string
}

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['app.component.scss'],
  template: `
    <div>
      <div *ngFor="let file of mapped">
        <p>{{ file.name }}</p>
        <!-- Call the pipe on the file size and pass the suffix value -->
        <p>{{ file.size }}</p>
      </div>
    </div>
  `,
  providers: [
    FilesizePipe
    ]
})
export class AppComponent implements OnInit {
  files: File[];
  mapped: File[];

  constructor(private fileSizePipe: FilesizePipe) {
  }


  ngOnInit() {
    this.files = [
      { name: 'logo.svg', size: 2120109, type: 'image/svg' },
      { name: 'banner.jpg', size: 18029, type: 'image/jpg' },
      { name: 'background.png', size: 1784562, type: 'image/png' }
    ];

    // use the pipe to filter on the typescript side
    this.mapped = this.files.map(file => {
      return {
        name: file.name,
        type: file.type,
        size: this.fileSizePipe.transform(file.size, 'Mb')
      }
    });
  }
}
