import { Component } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'lib-skeleton-loaders',
  standalone: true,
  imports: [
    NgxSkeletonLoaderModule
  ],
  template: `
    <p>
      skeleton-loaders works!
      <ngx-skeleton-loader count="5" appearance="circle" />
    </p>
  `,
  styles: ``
})
export class SkeletonLoadersComponent {

}
