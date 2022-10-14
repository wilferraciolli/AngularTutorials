import {
  AfterContentInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
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
      <button (click)="destroyComponent()"
              *ngIf="component"> Destroy
      </button>
      <button (click)="moveComponent()"
              *ngIf="component"> Move
      </button>
      <div #entry>

      </div>
    </div>
  `
})
export class AppComponent implements AfterContentInit {
  @ViewChild('entry', { read: ViewContainerRef })
  entry: ViewContainerRef;

  component: ComponentRef<AuthFormComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }


  public ngAfterContentInit(): void {
    // dynamically create a component, this will get the 'entry' reference in the DOM and instantiate a component
    const authFormFactory = this.componentFactoryResolver.resolveComponentFactory(AuthFormComponent);

    // render the first component
    this.entry.createComponent(authFormFactory);

    // render second component on the dom
    this.component = this.entry.createComponent(authFormFactory, 0);
    this.component.instance.title = 'Create Account';// overriding local properties
    this.component.instance.submitted.subscribe(this.loginUser); //subscribing to outputs

    console.log(this.component.instance);
  }


  public destroyComponent() {
    // console.log(this.component);
    this.component.destroy();// destroy component
  }

  public moveComponent() {
    this.entry.move(this.component.hostView, 1);
  }

  loginUser(user: User) {
    console.log('Create account', user);
  }
}
