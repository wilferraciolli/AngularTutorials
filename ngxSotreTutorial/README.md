# NgxSotreTutorial

tutorial can be found here
`https://duncanhunter.gitbook.io/angular-and-ngrx/3.-test-homecomponent`

##Tests
To run type in `npm test`

##dependencies

Jest testing framework (NOT working)
`npm i jest-preset-angular jest -D`
`ng add @davinkevin/jest`

Walllaby.js (Ps this also needs to configure the wallaby json config file)
`ng add ngcli-wallaby`

Fake backend
`npm i angular-in-memory-web-api -D`

ngRx store
`npm i @ngrx/store`

ngRx store dev tools (This need config on the modules to allow the extension to debug state)
`npm install @ngrx/store-devtools`

ngRx Effects - to react to actions dispatched
`npm i @ngrx/effects`

ngRx schematics
`npm i @ngrx/schematics -D`



#### RxJs cheat sheet

| Operator       | When to use | Use case                                                          |
|----------------|---------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|
| **switchMap**  | Cancels the current subscription/request and can cause race condition| Use for get requests or cancelable requests like searches         |
| **concatMap**  |Runs subscriptions/requests in order and is less performant| Use for get, post and put requests when order is important        
| **mergeMap**   |Runs subscriptions/requests in parallel|  Use for put, post and delete methods when order is not important |
| **exhaustMap** |Ignores all subsequent subscriptions/requests until it completes|Use for login when you do not want more requests until the initial one is complete |



