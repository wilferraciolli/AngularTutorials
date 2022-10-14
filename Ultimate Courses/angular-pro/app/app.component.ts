import { AfterContentInit, Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { read } from 'fs';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { User } from './auth-form/auth-form.interface';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <div>
      <div #entry>

      </div>
    </div>
  `
})
export class AppComponent implements AfterContentInit {
  @ViewChild('entry', { read: ViewContainerRef })
  entry: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }


  public ngAfterContentInit(): void {
    // dynamically create a component, this will get the 'entry' reference in the DOM and instantiate a component
    const authFormFactory = this.componentFactoryResolver.resolveComponentFactory(AuthFormComponent);

    // render first component on the dom
    const firstComponent = this.entry.createComponent(authFormFactory);
    firstComponent.instance.title = 'Create Account';// overriding local properties
    firstComponent.instance.submitted.subscribe(this.loginUser); //subscribing to outputs

    console.log(firstComponent.instance);
  }


  loginUser(user: User) {
    console.log('Create account', user);
  }
}
