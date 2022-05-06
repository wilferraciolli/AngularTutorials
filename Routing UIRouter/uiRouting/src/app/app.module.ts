import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UIRouter, UIRouterModule } from '@uirouter/angular';
import { StateTree } from "@uirouter/visualizer";

import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { AboutComponent } from './about/about.component';

const helloState = { name: "hello", url: "/hello", component: HelloComponent };
const aboutState = { name: "about", url: "/about", component: AboutComponent };

export function uiRouteConfigFn(router: UIRouter, injector: Injector) {
  // Configure the initial state
  // If the browser URL doesn't matches any state when the router starts,
  // go to the `hello` state by default
  router.urlService.rules.initial({ state: "hello" });

  // Use @uirouter/visualizer to show the states as a tree
  StateTree.create(router, document.getElementById("statetree"), {
    width: 200,
    height: 100
  });
}

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    UIRouterModule.forRoot({
      states: [helloState, aboutState],
      useHash: true ,
      config: uiRouteConfigFn
    }    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
