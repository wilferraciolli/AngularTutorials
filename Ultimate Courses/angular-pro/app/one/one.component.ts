import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'example-one',
  encapsulation: ViewEncapsulation.Native, // default value
  styles: [`
    .example-one {
      background: #9f72e6;
      font-size: 19px;
      color: #fff;
      margin-bottom: 50px;
      padding: 10px 20px;
    }
  `],
  template: `
    <div class="example-one">
      Example One
    </div>
  `
})
export class ExampleOneComponent {

}
