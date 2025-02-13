# RecurrenceRule

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Dependencies
#### RRule JS
Used to generate recurrence instances for a given RRULE to install run `https://github.com/jkbrzt/rrule`
```
   npm install rrule
```

#### Moment JS
Used to generate dates and apply locale `https://momentjs.com/docs/#/get-set/day/`
```
   npm install moment --save
```
In order to use moment within the components, it must be imported as follow
```typescript
  import * as moment from 'moment';
```

#### Angular material
Used for UI components
```
   ng add @angular/material
```
