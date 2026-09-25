# Form fields sample application

A small Angular 21 + Angular Material playground for **reusable date, time and date-time form fields**
and for **converting date-times between UTC and IANA timezones**.

The fields wrap the native HTML5 inputs (`date`, `time`, `datetime-local`) and plug into Angular
Reactive Forms through `ControlValueAccessor` and `Validator`. That means they can be used with
`formControlName` like any built-in input, and they bring their own min/max/required validation and
error messages.

More details on the native pickers:
https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types#date_and_time_pickers

---

## Getting started

```bash
npm install
npm start                     # ng serve -> http://localhost:4200
npm test                      # Karma + Jasmine unit tests
npm run build                 # production build (SSR + prerender enabled)
npm run serve:ssr:form-fields # serve the SSR build with Express
```

## Project structure

```
src/app
├── fields/                         # Reusable form controls (the "library" part)
│   ├── date-field/                 # <app-date-field>       type="date"            value: YYYY-MM-DD
│   ├── time-field/                 # <app-time-field>       type="time"            value: hh:mm
│   ├── date-time-field/            # <app-date-time-field>  type="datetime-local"  value: YYYY-MM-DDThh:mm
│   │   └── date-time.service.ts    # UTC <-> timezone conversion helpers (Luxon + Intl)
│   └── utc-date-time-field/        # <app-utc-date-time-field> value: UTC instant YYYY-MM-DDThh:mm:ssZ (Temporal)
├── forms/                          # Typed form model + builder service used by the Full Form demo
│   ├── date-time.form.ts           # DateTimeForm (typed FormGroup controls)
│   ├── date-time.model.ts          # DateTimeModel (plain value object)
│   └── date-time-form-builder.service.ts
└── components/                     # Demo pages, shown as tabs in AppComponent
    ├── full-form/                  # Tab "Full Form"
    ├── date-time-form/             # Tab "Date Time with timezone"
    ├── date-time-timezone-form/    # Tab "Date Time with UTC"
    └── utc-date-time-form/         # Tab "UTC field (Temporal)"
```

## The demo tabs

| Tab | Component | What it shows |
|-----|-----------|---------------|
| **Full Form** | `FullFormComponent` | All three fields in one typed reactive form with required/min/max validation, reset and submit, plus a live dump of the form value, validity and errors. It also compares a `disabled` input with a `readonly` one (focus, submission and screen-reader behaviour). |
| **Date Time with timezone** | `DateTimeFormComponent` | The user picks a timezone and a local date-time, and the page shows the equivalent **UTC** value (`parseDateTimeFromTimezoneToUTC`). |
| **Date Time with UTC** | `DateTimeTimezoneFormComponent` | The user types a **UTC** ISO string (`YYYY-MM-DDThh:mm:ssZ`), and the page shows it in the selected timezone and in London, Nicosia and São Paulo (`parseUTCDateTimeToTimezone`). |

## Reusable fields

All three fields share the same API and behaviour:

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `label` | `string` | e.g. `Enter the date` | Label shown above the input (also used as placeholder). |
| `required` | `boolean` | `false` | Adds a `required` validation error when empty. |
| `min` | `string` | see constants | Minimum allowed value, in the field's value format. |
| `max` | `string` | see constants | Maximum allowed value, in the field's value format. |
| `min…ErrorLabel` / `max…ErrorLabel` | `string` | e.g. `Date cannot be before ` | Prefix of the min/max error message (the limit value is appended). |

The error-label input names differ per field: `minDateErrorLabel`, `minTimeErrorLabel`, `minDateTimeErrorLabel`
(and the `max…` equivalents).

### Value formats and defaults

| Field | Selector | Value format | Default `min` | Default `max` | Constants file |
|-------|----------|--------------|---------------|---------------|----------------|
| Date | `app-date-field` | `YYYY-MM-DD` | `1970-01-01` | `9999-01-01` | `date.constants.ts` |
| Time | `app-time-field` | `hh:mm` (24h) | `01:00` | `23:59` | `time.constants.ts` |
| Date-time | `app-date-time-field` | `YYYY-MM-DDThh:mm` | `1970-01-01T00:00` | `9999-01-01T23:59` | `date-time.constants.ts` |

Values are plain **timezone-free strings**, exactly what the native inputs produce. Min/max checks
compare the strings lexicographically, which works because the formats are zero-padded ISO strings.

### Validation error keys

The field registers itself as a validator (`NG_VALIDATORS`), so errors appear on the parent `FormControl`:

| Field | Errors |
|-------|--------|
| Date | `required`, `cannotBeBeforeMinDate`, `cannotBeAfterMaxDate` |
| Time | `required`, `cannotBeBeforeMinTime`, `cannotBeAfterMaxTime` |
| Date-time | `required`, `cannotBeBeforeMinDateTime`, `cannotBeAfterMaxDateTime` |

Each field also renders its own error message beneath the input, so the parent does not need to.

### Usage

```ts
@Component({
  imports: [ReactiveFormsModule, DateFieldComponent, TimeFieldComponent, DateTimeFieldComponent],
  template: `
    <form [formGroup]="form">
      <app-date-field label="Start date" [required]="true" min="2024-01-01" max="2024-12-31" formControlName="date" />
      <app-time-field label="Start time" [required]="true" min="09:00" max="17:00" formControlName="time" />
      <app-date-time-field label="Appointment" formControlName="dateTime" />
    </form>
  `
})
export class MyComponent {
  form = inject(FormBuilder).group({
    date: '2024-01-01',
    time: '09:00',
    dateTime: '2024-01-01T09:00'
  });
}
```

## UTC date-time field (Temporal API)

`<app-utc-date-time-field>` (`src/app/fields/utc-date-time-field/`) is a date-time field whose **form value
is always a UTC instant** (`2024-05-01T09:00:00Z`). The user sees and edits the wall-clock time of the
`timeZone` input. Changing the timezone changes what is displayed but never changes the value.
The "UTC field (Temporal)" tab demonstrates it.

```html
<app-utc-date-time-field
  label="Appointment"
  [timeZone]="'Europe/London'"
  [required]="true"
  [min]="'2024-01-01T00:00:00Z'"
  formControlName="appointment" />
```

| Input | Default | Description |
|-------|---------|-------------|
| `timeZone` | user's timezone (`Temporal.Now.timeZoneId()`) | IANA id used to display and edit the value. |
| `min` / `max` | `null` | Limits as **UTC** instants, compared with `Temporal.Instant.compare`. |
| `required` | `false` | |
| `disambiguation` | `'earlier'` | Which occurrence to use when a time happens twice (clocks going back). |
| `label`, `requiredErrorLabel`, `invalidErrorLabel`, `minErrorLabel`, `maxErrorLabel` | | Texts. |

Errors: `required`, `invalidUtcDateTime`, `cannotBeBeforeMinUtcDateTime`, `cannotBeAfterMaxUtcDateTime`.

**Daylight saving is handled explicitly:**
- *Gap* (clocks go forward, e.g. London 2024-03-31 01:30 doesn't exist): the time is shifted forward
  to 02:30 BST and a notice explains why.
- *Overlap* (clocks go back, e.g. London 2024-10-27 01:30 happens twice): the `disambiguation` occurrence
  is used and a notice says which offset was chosen.

It also already applies several of the improvements proposed below: signal inputs, `OnPush`,
`writeValue` that doesn't echo back, `registerOnValidatorChange`, a linked `<label>`, and `aria-describedby`.

**Why a polyfill?** Chrome and Firefox now ship `Temporal`, but Safari and Node (used for SSR/prerender)
don't yet, so the field imports `Temporal` from [`temporal-polyfill`](https://www.npmjs.com/package/temporal-polyfill)
(about 20 kB gzipped). When all your targets support it natively, remove the import and use the global `Temporal`.

## DateTimeService

`src/app/fields/date-time-field/date-time.service.ts` (`providedIn: 'root'`)

| Method | Input | Output | Notes |
|--------|-------|--------|-------|
| `parseUTCDateTimeToTimezone(utc, tz)` | `2024-05-01T09:00:00Z`, `Europe/London` | `2024-05-01T10:00` | Uses Luxon. The output is ready to bind to `<app-date-time-field>`. |
| `parseDateTimeFromTimezoneToUTC(local, tz)` | `2024-05-01T10:00`, `Europe/London` | `2024-05-01T09:00:00Z` | Uses `Date` + `Intl` offset calculation. |
| `resolveUsersTimezone()` | none | e.g. `Europe/London` | Reads the browser timezone and falls back to `Europe/London`. |

Typical flow: **store UTC on the backend**, convert it to the user's (or a chosen) timezone for display
and editing, and convert back to UTC before saving.

## Timezones

Use IANA timezone ids (e.g. `Europe/London`, `Asia/Nicosia`, `America/Sao_Paulo`). The full list can be found here:
https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

Compare timezones including UTC:
`https://www.timeanddate.com/worldclock/converter.html?iso=20240808T110000&p1=1440&p2=136&p3=680&p4=233`

## Dependencies

- Angular 21 (standalone components, control-flow syntax), Angular Material 21
- Luxon for timezone conversion

```bash
npm install --save luxon luxon-angular
npm i --save-dev @types/luxon
```

> `luxon-angular` is installed but not currently imported anywhere in `src/`.

---

## Proposed improvements

### Bugs worth fixing first

1. **Clearing the date-time field crashes the "Date Time with timezone" tab.**
   `parseDateTimeFromTimezoneToUTC('')` runs `dateParts[3].split(...)` on `undefined` and throws inside
   the template. The service methods should guard against empty or invalid input and return `''`/`null`.
   `parseUTCDateTimeToTimezone` has a related problem: a partially typed UTC string renders `NaN-NaN-NaNTNaN:NaN`.
2. **`dateTimeUK` is initialised with the Cyprus value** in `DateTimeTimezoneFormComponent`
   (`dateTimeUK: this._formBuilder.control(convertedDateTimeCY)`). Also, `dateTimeInUtc` starts at
   `2024-06-01…`, but the converted fields are computed from `2024-05-01…`, so the page is inconsistent on load.
3. **`parseDateTimeFromTimezoneToUTC` can be off by an hour around DST changes.** It works out the offset
   at the wrong instant and parses a locale-formatted string with `new Date(...)`, which is
   implementation-dependent. Luxon is already a dependency, and this is a one-liner with it:
   ```ts
   DateTime.fromISO(local, { zone: tz }).toUTC().toISO({ suppressMilliseconds: true, includeOffset: true })
   ```
4. **The default time `min` is `01:00`**, so any time between 00:00 and 00:59 fails validation unless
   the caller overrides it. It should be `00:00`.
5. **`writeValue` calls `onChange` and `onTouched`.** `writeValue` is the form pushing a value *into* the
   control. Echoing it back re-emits `valueChanges`, and after the first `patchValue`/`reset` it marks the
   control as touched. That makes the `form.untouched` check in `shouldDisableSubmit()` unreliable.
   `writeValue` should only set `this.value`.
6. **Changing `min`/`max`/`required` at runtime does not re-validate.** Implement
   `registerOnValidatorChange` and call it when those inputs change (or use signal inputs and an `effect`).
7. **The demo `max` values (`2025-07-01T23:59`) are already in the past**, so picking a current date
   shows an error. Derive them from "today", or remove them.

### Reusability / API

- **Remove the triplication.** The three field components are about 95% identical. Extract an abstract
  `BaseDateTimeInputComponent` (value accessor + validator + error signals), or use a single component with
  a `type` input. Each field then only supplies its type, defaults and error keys.
- **Unify the error-label inputs** (`minErrorLabel` / `maxErrorLabel` / `requiredErrorLabel`) across fields,
  and make "This field is required." configurable (and translatable with i18n).
- **Move to signal-based APIs:** `input()` instead of `@Input`, `ChangeDetectionStrategy.OnPush`, and
  `track timezone.id` instead of `track timezone` in the `@for` loops.
- **Package the fields as an Angular library** (`ng generate library form-fields`) so other projects can
  `npm install` them instead of copying folders. Export a `public-api.ts` with the three fields,
  `DateTimeService` and the constants.
- **Move `DateTimeService` out of `date-time-field/`** (e.g. into `shared/` or `core/`), since it is
  independent of the UI component. Move `TimeZone` and the duplicated `timezones` list there too.
- **Decide on Material integration.** The inputs use `matInput` but are not inside `<mat-form-field>`,
  so they get neither Material styling nor `mat-error`. Either wrap them properly, or implement
  `MatFormFieldControl` so a field can be dropped into a `<mat-form-field>`. Right now it is halfway between the two.
- **Provide `DateTimeFormBuilderService` at component level.** It is `providedIn: 'root'` and owns a
  `FormGroup`, so every consumer shares the same form state for the whole app lifetime.

### Accessibility

- The `<label>` is not linked to its `<input>` (no `for`/`id`), so clicking it does not focus the input and
  screen readers don't announce it. Generate a unique id per instance.
- Link error messages with `aria-describedby`, set `aria-invalid` when invalid, and consider `role="alert"`
  on the error text.
- Don't use the label as the placeholder too; it is redundant and disappears on input.

### Code hygiene

- Remove dead code: `parseUTCDateTimeToTimezone0`, `_get_timezoneOffset`, `_CYPRUS_TIMEZONE`,
  `_UTC_TIMEZONE`, the large commented-out blocks in `app.component.html/.ts`, and unused imports
  (`RouterOutlet`, `JsonPipe`, `MatTabGroup` in `FullFormComponent`, etc.).
- Remove the `console.log` calls in `writeValue` and in the service.
- Type things properly: replace `get dateTime(): any` with `FormControl<string | null>`, `onChange: Function`
  with `(value: string) => void`, and `writeValue(newValue: any)` with `string | null`.
- `AppComponent.ngOnInit` exists without `implements OnInit`. The empty constructors can go.
- Only `DateFieldComponent` uses `ViewEncapsulation.None`. Make the three consistent.
- The three identical "Reset" buttons in the Full Form look like leftover colour experiments.

### Tests

- The specs only assert `should be created`. The most valuable tests to add:
  - `DateTimeService`: UTC ↔ timezone round-trips for London, Nicosia and São Paulo in winter and summer,
    plus DST-transition edge cases and empty/invalid input. The commented `console.log` cases in
    `AppComponent` already list the expected values and can be turned directly into test cases.
  - Each field: `required`/min/max errors, and error messages rendered in the DOM.
- Angular 21 defaults to **Vitest** (Karma is deprecated). Consider migrating by switching the `test` builder in `angular.json` to `@angular/build:unit-test`
  (see the Angular testing migration guide).

### Tooling / platform

- Consider going **zoneless** (`provideZonelessChangeDetection()`) now that the fields use signals.
- Update `@types/node` (currently `^18`) and `express` (`^4` → `^5`) to match the Angular 21 SSR template.
- Remove `luxon-angular` if it stays unused.
- The app is not using routing (`routes = []`). Either remove `provideRouter` or make each demo a route
  so the tabs are deep-linkable.
