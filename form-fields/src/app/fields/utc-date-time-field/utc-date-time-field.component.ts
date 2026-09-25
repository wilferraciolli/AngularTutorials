import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  forwardRef,
  input,
  signal,
  untracked,
  WritableSignal
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import { Temporal } from 'temporal-polyfill';
import {
  UTC_DATE_TIME_FIELD_TYPE,
  UTC_DATE_TIME_INVALID_ERROR_LABEL,
  UTC_DATE_TIME_LABEL,
  UTC_DATE_TIME_MAX_ERROR_LABEL,
  UTC_DATE_TIME_MIN_ERROR_LABEL,
  UTC_DATE_TIME_REQUIRED_ERROR_LABEL,
  UtcDateTimeDisambiguation
} from './utc-date-time.constants';

let nextId: number = 0;

/**
 * Date and time field whose form value is always a UTC instant (YYYY-MM-DDThh:mm:ssZ),
 * while the user sees and edits the wall-clock time of the given `timeZone`.
 *
 * Conversions use the Temporal API (via temporal-polyfill until every runtime ships it natively),
 * so daylight-saving gaps and overlaps are resolved explicitly instead of by accident.
 */
@Component({
  selector: 'app-utc-date-time-field',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => UtcDateTimeFieldComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => UtcDateTimeFieldComponent)
    }
  ],
  templateUrl: './utc-date-time-field.component.html',
  styleUrl: './utc-date-time-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UtcDateTimeFieldComponent implements ControlValueAccessor, Validator {
  public label = input<string>(UTC_DATE_TIME_LABEL);

  /** IANA timezone used to display and edit the value, Eg 'Europe/London'. Defaults to the user's timezone. */
  public timeZone = input<string>(Temporal.Now.timeZoneId());

  /** Minimum allowed instant in UTC, Eg '2024-01-01T00:00:00Z'. */
  public min = input<string | null | undefined>(null);

  /** Maximum allowed instant in UTC, Eg '2025-12-31T23:59:00Z'. */
  public max = input<string | null | undefined>(null);

  public required = input<boolean>(false);

  /** Which occurrence to use when the entered time happens twice (clocks going back). */
  public disambiguation = input<UtcDateTimeDisambiguation>('earlier');

  public requiredErrorLabel = input<string>(UTC_DATE_TIME_REQUIRED_ERROR_LABEL);
  public invalidErrorLabel = input<string>(UTC_DATE_TIME_INVALID_ERROR_LABEL);
  public minErrorLabel = input<string>(UTC_DATE_TIME_MIN_ERROR_LABEL);
  public maxErrorLabel = input<string>(UTC_DATE_TIME_MAX_ERROR_LABEL);

  public readonly fieldType: string = UTC_DATE_TIME_FIELD_TYPE;
  public readonly inputId: string = `utc-date-time-field-${ nextId++ }`;

  public readonly utcValue: WritableSignal<string | null> = signal(null);
  public readonly disabled: WritableSignal<boolean> = signal(false);
  public readonly errors = computed(() => this._getErrors(this.utcValue()));

  /** Explains how a DST gap or overlap was resolved for the last value typed by the user. */
  public readonly notice: WritableSignal<string | null> = signal(null);

  public readonly localValue = computed(() => toLocalDateTime(this.utcValue(), this.timeZone()));
  public readonly localMin = computed(() => toLocalDateTime(this.min(), this.timeZone()));
  public readonly localMax = computed(() => toLocalDateTime(this.max(), this.timeZone()));
  public readonly offset = computed(() => toOffset(this.utcValue(), this.timeZone()));

  private _onChange: (value: string | null) => void = () => {
  };
  private _onTouched: () => void = () => {
  };
  private _onValidatorChange: () => void = () => {
  };

  constructor() {
    // re-validate when the rules change at runtime
    effect(() => {
      this.required();
      this.min();
      this.max();
      untracked(() => this._onValidatorChange());
    });

    // the notice refers to the previous timezone, the instant itself does not change
    effect(() => {
      this.timeZone();
      untracked(() => this.notice.set(null));
    });
  }

  public writeValue(value: string | null): void {
    this.utcValue.set(value || null);
    this.notice.set(null);
  }

  public registerOnChange(fn: (value: string | null) => void): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  public registerOnValidatorChange(fn: () => void): void {
    this._onValidatorChange = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  public onLocalInput(localDateTime: string): void {
    this.notice.set(null);

    if (!localDateTime) {
      this._emit(null);
      return;
    }

    const timeZone: string = this.timeZone();
    const plainDateTime = Temporal.PlainDateTime.from(localDateTime);
    const earlier = plainDateTime.toZonedDateTime(timeZone, { disambiguation: 'earlier' });
    const later = plainDateTime.toZonedDateTime(timeZone, { disambiguation: 'later' });

    let chosen = earlier;

    if (!earlier.equals(later)) {
      const isGap: boolean = !earlier.toPlainDateTime().equals(plainDateTime);

      if (isGap) {
        // clocks went forward, the wall time never happened: shift it forward by the gap
        chosen = later;
        this.notice.set(
          `${ formatLocal(plainDateTime) } does not exist in ${ timeZone } (clocks go forward). `
          + `Using ${ formatLocal(chosen.toPlainDateTime()) } (UTC${ chosen.offset }) instead.`);
      } else {
        // clocks went back, the wall time happened twice
        chosen = this.disambiguation() === 'later' ? later : earlier;
        this.notice.set(
          `${ formatLocal(plainDateTime) } happens twice in ${ timeZone } (clocks go back). `
          + `Using the ${ chosen === earlier ? 'first' : 'second' } occurrence (UTC${ chosen.offset }).`);
      }
    }

    this._emit(chosen.toInstant().toString());
  }

  public onBlur(): void {
    this._onTouched();
  }

  public validate(control: AbstractControl<string | null>): ValidationErrors | null {
    return this._getErrors(control.value);
  }

  private _getErrors(value: string | null): ValidationErrors | null {
    if (!value) {
      return this.required() ? { required: true } : null;
    }

    const instant = parseInstant(value);

    if (!instant) {
      return { invalidUtcDateTime: { value } };
    }

    const min = parseInstant(this.min());

    if (min && Temporal.Instant.compare(instant, min) < 0) {
      return { cannotBeBeforeMinUtcDateTime: { value, min: this.min() } };
    }

    const max = parseInstant(this.max());

    if (max && Temporal.Instant.compare(instant, max) > 0) {
      return { cannotBeAfterMaxUtcDateTime: { value, max: this.max() } };
    }

    return null;
  }

  private _emit(value: string | null): void {
    this.utcValue.set(value);
    this._onChange(value);
  }
}

function parseInstant(value: string | null | undefined): Temporal.Instant | null {
  if (!value) {
    return null;
  }

  try {
    return Temporal.Instant.from(value);
  } catch {
    return null;
  }
}

/**
 * Converts a UTC instant into the YYYY-MM-DDThh:mm wall-clock value of a timezone,
 * as expected by a datetime-local input. Returns '' for empty or invalid values.
 */
function toLocalDateTime(value: string | null | undefined, timeZone: string): string {
  const instant = parseInstant(value);

  if (!instant) {
    return '';
  }

  try {
    return formatLocal(instant.toZonedDateTimeISO(timeZone).toPlainDateTime());
  } catch {
    // invalid timezone id
    return '';
  }
}

function toOffset(value: string | null, timeZone: string): string | null {
  const instant = parseInstant(value);

  if (!instant) {
    return null;
  }

  try {
    return instant.toZonedDateTimeISO(timeZone).offset;
  } catch {
    return null;
  }
}

function formatLocal(plainDateTime: Temporal.PlainDateTime): string {
  return plainDateTime.toString({ smallestUnit: 'minute' });
}
