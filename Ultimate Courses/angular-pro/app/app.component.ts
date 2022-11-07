import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
    <div class="app">
      <header>
        <img src="/img/logo.svg">
      </header>
      <div class="app__content">
        <nav>
          <!-- delete any inner outlet from the path when clicking on those buttons as the url will be build based on inner outlet -->
          <a
            [routerLink]="['/mail', { outlets: { primary: 'folder/inbox', pane: null } }]"
            routerLinkActive="active">
            Inbox
          </a>
          <!-- delete any inner outlet from the path when clicking on those buttons as the url will be build based on inner outlet -->
          <a
            [routerLink]="['/mail', { outlets: { primary: 'folder/trash', pane: null } }]"
            routerLinkActive="active">
            Trash
          </a>
          <!-- Lazy load new module -->
          <a
            [routerLink]="['/dashboard']"
            routerLinkActive="active">
            Dashboard
          </a>
        </nav>
        <router-outlet></router-outlet>
      </div>
    </div>

    <!--     <div>
    Uncomment this for the reactive forms lessons <stock-inventory></stock-inventory>
    </div>-->
  `,
  providers: [
    FilesizePipe
  ]
})
export class AppComponent implements OnInit {
  files: File[];
  mapped: File[];

  constructor(private fileSizePipe: FilesizePipe,
              private router: Router) {
  }

  ngOnInit() {
    //subscribe to routing events
    this.router.events
        .filter(event => event instanceof NavigationEnd)
        .subscribe(event => {
          // console.log(event);
        });

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
      };
    });
  }
}
