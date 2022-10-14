import {
  AfterContentInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef, TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { read } from 'fs';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { User } from './auth-form/auth-form.interface';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div>
      <div #entry></div>

      <template #tmpl>
        Wiliam Ferraciolli: Cy
      </template>

    </div>
  `
})
export class AppComponent implements AfterContentInit {
  @ViewChild('entry', { read: ViewContainerRef })
  entry: ViewContainerRef;

  @ViewChild('tmpl')
  tmpl: TemplateRef<any>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }


  public ngAfterContentInit(): void {
    // create a dynamic component
    this.entry.createEmbeddedView(this.tmpl);
  }


}
