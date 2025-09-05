# AngularCore
Project to demonstrate core Angular functionality

# dependencies
Material
`ng add @angular/material`


# Topics
### Angular core
Angular core functionality

#### Pipes
Angular pipes allow transforming data within templates, it is used by adding the | symbol to the end of the expression. There are built in pipes Eg `date`, `currency`, `json`... but also allow for custom pipes.
Pipes can be combined with other pipes. Pipes are `pure` by default meaning they are stateless and wont re-run as the value changes unless if the input changes. not pure pipes will re-run every time which can be an issue on performance.
To create a custom pipe we can:
```typescript
  @Pipe({
    name: 'customDateFormatter',
    pure: true
  })
  export class DateFormatter implements PipeTransform {
    transform(value: string, formatter?: string): anyReturnType {
      if(formatter){
        return Date.format(value, formatter);
      }
      
      return Date.format(value, 'YYYY-MM-DD');;
    }
  }

```
Then when using the pipe, we only need to pass a string version of the date and the formatter we want to use. {{ date | customDateFormatter:'YY-mmm' }}

#### Directives
Angular directives are used to add functionality to an element within the DOM, it is a well known advantage of Angular over other frameworks. Directives are mainly used for structural or behavioural requirements.
Its main advantages is that they allow using clean code (Angular syntax and typescript types) to manipulate the DOM by extending its functionality, they allow reusability and easy testing.
Directives can be split down onto 3 types, components, attributes and structural but also allow the creationg of custom directives.

###### Directive - Component
Every angular component is a directive, they are defined as selectors and can have a template and a class, this is used to display a component in the DOM by allowing the selector name to be used as in a normal html tag.

###### Directive - Attribute
These are directives that are used to add behaviour to an element, they can be applied to elements and have their own logic applied to that attribute.
Eg

```typescript

@Directive({
  selector: '[myAtrributeDirective]'
})
export class HighlightDirective implements OnInit {
  @Input()
  value: string;

  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.style.color = 'someColor';
  }
}
```
The above can be used on any htm that is a string value. Eg `<div myAtrributeDirective="someValue"></div>` or `<p [myAtrributeDirective]='some Value'"></p>`
###### Directive - Structural
These are directives that can be used to modify the structure of the DOM, they can be used to add or remove elements from the DOM. There are some built in structural directives that are used to add and remove elements from the DOM.
Eg ngIf, ngFor, ngSwitch, ngIf, ngSwitchCase, ngSwitchDefault... they are all used to apply some logic and add or remove elements from the DOM.

#### Routing
As Angular is an SPA single page application, it uses the path-to-view MVC pattern whereby it allows the display of different pages within the single loaded page based on the path. Angular allow this by adding the
`router-outlet` directive to the template which will them be used to load pages based on the url.
An app can have multiple router outlets, but each will need to have its own name so navigation will be possible based on which router outlet the intended page/component should be loaded.
To use routing in Angular (ps within PF we use UI-Router which is different than Angular's router) we simply add the ng-router module and define an array of route objects
Eg
```typescript
const routes: Routes = [
  { path: '', component: EmptyDefaultcompoent },
  { path: 'theUrlPath', component: ComponentToLoadOnGivenPath },
  { path: 'theUrlPath/:id', component: ComponentToLoadOnGivenPathAndId },
  { 
      path: 'admin', 
      component: ComponentToLoadOnGivenPathAndId,
      children: [
        { path: 'theme', component: AdminThemeComponent },
        { path: 'language', component: AdminLanguageComponent },
      ]
  },
  { path: 'oldPath', redirectTo: '/theUrlPath' },
  { path: '**', component: WildCardForNotFoundComponent },
];
```
Angular Routing also allow lazy loading of components or modules allowing users to only download the pages that they are navigating on instead of the whole app, this speed up the initial download/load app.
this is very benefitial when dealing with large apps that has too many areas and normally the user only uses one at a time. 
```typescript
const routes: Routes = [
  { 
    path: 'somePath',
    loadComponent: () => import('.component/lazy-loaded-component').then(c => LazyLoadedComponent)
  }
];
```
Routes can also be added with Guards that can run during navigation, angular routing will provide a few lifecycle hooks that can be used to validate navigation, they can be before, during or after navigation
Angular has few main services that can be used during navigation, they are Route and RoutSegment that allow to get details of the to and from url plus any parameters on the url, then the RouteSnapshot for current previous and next navigation, they can contain data and state of the app
```typescript
const routes: Routes = [
  { 
    path: 'securePath',
    component: SecurecomponentOnNavigatioin,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'somePth',
    component: SomeComponentOnLeaving,
    canDeactivate: [unsavedChangesGuard]
  },
  {
    path: 'somePth',
    component: SomeExperimentalWork,
    canMatch: [FeatureToggleGuard]
  }
];
```
Guards are created as functions, then exported. They are part of the dependency injection context so it can use another inject content. Guards are simple boolean expression that are used for granting access to routes and can ge handled to block access or redirect
```typescript
export const someGuard: CanActivateFn | CanDeactivateFn | CanMatchFn (routeAvailable: RouteSnapshotDetails){
  const injectableService: SomeService = inject(SomeService);
  
  return injectableService.canActivateOrDeactivateSomeLogic();
}
```

Angular Route Resolve interfaces. This is where it allows more dynamic routing and it is necessary when reloading the app and bringing the state back to what it was. Resolve is s a simple function implemeted on a service 
which can take inputs from the url or data passed onto the snapshot and return data onto the component during ngOnInit either by passing as resolved (Observabel or Promise) data or inset onto the component's input attributes
```typescript
@Injectable
export class RouteComponentResolverService implemets Resolve<SomeObject>{
  const service1 = inject(Service1);
  const service2 = inject(Service2);
  
  resolve(route: Activatedroute, state: RouteSnapshot){
    return this.service1.mapResponse(
      this.service1.someMethod(route.param.get('id')));
  }
}

const routes: Routes = [
  { 
    path: 'path',
    component: ComponentThatNeedsResolvedData,
    resolve: {
      inputName: RouteComponentResolverService,
      someData: AnotherResolverService
    }
  }
];
```
On the resolvable above  before navigating to this component, Angular router will run the resolver and pass the return value to the input called inputName if the component has the input matching the name and if inputBinding is set up within app config
Alternativetely, it is possible to inject the Activated Route service and get the data on the ngOnInit lifecycle
```ts
 ngOnInit() {
   this.activatedRoute.data.subscribe(({ inputName }) => {
     // manage data passed in here
   })
 }
```
Ps note that as oppose to UIRouter, in Angular each resolve is not passed on to the next so if one data needs resolving as input of the next resolve, then it is not possible using the Angular Router

#### Provides
Providers is a feature in Angular that allows the user to set up and manipulate how things are injected onto Angular during runtime, the dependency injection context is able to inject provided services within the app
but also allow to configuration to be assinged to instances so when using a dependency it can be provided with custom config.
Eg by injecting the LoggerService, Angular will instantiate an instance of the LoggerService using its default constructor, however Angular allow you to override the provided instance to be another logger depending on config such as environment properties.
In case of an App deploy to region X, Angular allows to use a factory to instantiate a different LoggerService based on its property Eg provide=LoggerService, useFactory=CustomLoggerServiceInstantiateBasedOnConfigService

Providers main utility is to allow provided services/data changes without affecting the components that uses it. providers can be defined at application level or component level. The most common usage is defining a provider for Dates
Eg today we use momentJS and in the future we want to use Luxon so we would define for the DateTimeService the provider that uses momentJs, but could easily change to use Luxon without breaking the consumers.

Providers can be defined within a few types:
* userClass = Allows to specify which class should be used when DI instantiate a class for usage
```ts
   { provide: Logger, useClass: CustomLogger}
```
* useExisting = Allows to pass the same instance to 2 classes, used when you create a new Service and want all of the usage of the old service to use the instance of the new one
```ts
   { provide: OldLogger, useExisting: NewLogger}
```
* useFactory = Allows to use a factory function to instantiate an instance of a class, this is part of the DI context so other services can be injected Eg DateTimeFactoryServiceWithDependecies
```ts
   { provide: OldLogger, useFactory: logServiceFactory, deps: [Logger, UserService]}
```
* useValue = Allows value objects to be instantiated and modified based on system properties, ideal for configuring system settings
```ts
   { provide: APP_CONFIG, useValue: { theme: 'dark' } }
```

### Javascript

























