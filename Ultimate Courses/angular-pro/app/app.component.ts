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
      <!--      <auth-form-->
      <!--        (submitted)="createUser($event)">-->
      <!--        <h3>Create account</h3>-->
      <!--        <button type="submit">Join us</button>-->
      <!--      </auth-form>-->

      <!--      <auth-form-->
      <!--        (submitted)="loginUser($event)">-->
      <!--        <h3>Login</h3>-->
      <!--        <auth-remember (checked)="rememberUser($event)"></auth-remember>-->
      <!--        <button type="submit">Log in</button>-->
      <!--      </auth-form>-->
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

    // render first component on the dom
    const secondComponent = this.entry.createComponent(authFormFactory);
  }


  createUser(user: User) {
    console.log('Create account', user);
  }
}
