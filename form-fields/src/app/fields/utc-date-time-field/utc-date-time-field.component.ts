import {ChangeDetectionStrategy, Component, computed, input, model, signal, WritableSignal} from '@angular/core';
import {ValidationErrors} from '@angular/forms';
import {Temporal} from 'temporal-polyfill';
import {
  UTC_DATE_TIME_FIELD_TYPE,
  UTC_DATE_TIME_INVALID_ERROR_LABEL,
  UTC_DATE_TIME_LABEL,
  UTC_DATE_TIME_MAX_ERROR_LABEL,
  UTC_DATE_TIME_MIN_ERROR_LABEL,
  UTC_DATE_TIME_REQUIRED_ERROR_LABEL,
  UtcDateTimeDisambiguation
} from './utc-date-time.constants';
import {FormValueControl} from "@angular/forms/signals";

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
  templateUrl: './utc-date-time-field.component.html',
  styleUrl: './utc-date-time-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UtcDateTimeFieldComponent implements FormValueControl<string | null> {
  public value = model<string | null>(null);

  public label = input<string>(UTC_DATE_TIME_LABEL);
  /** IANA timezone used to display and edit the value, Eg 'Europe/London'. Defaults to the user's timezone. */
  public timeZone = input<string>(Temporal.Now.timeZoneId());
  /** Minimum allowed instant in UTC, Eg '2024-01-01T00:00:00Z'. */
  public minUtc = input<string | null | undefined>(null);
  /** Maximum allowed instant in UTC, Eg '2025-12-31T23:59:00Z'. */
  public maxUtc = input<string | null | undefined>(null);
  public required = input<boolean>(false);
  /** Which occurrence to use when the entered time happens twice (clocks going back). */
  public disambiguation = input<UtcDateTimeDisambiguation>('earlier');

  public requiredErrorLabel = input<string>(UTC_DATE_TIME_REQUIRED_ERROR_LABEL);
  public invalidErrorLabel = input<string>(UTC_DATE_TIME_INVALID_ERROR_LABEL);
  public minErrorLabel = input<string>(UTC_DATE_TIME_MIN_ERROR_LABEL);
  public maxErrorLabel = input<string>(UTC_DATE_TIME_MAX_ERROR_LABEL);

  public readonly fieldType: string = UTC_DATE_TIME_FIELD_TYPE;
  public readonly inputId: string = `utc-date-time-field-${nextId++}`;

  /** Explains how a DST gap or overlap was resolved for the last value typed by the user. */
  public readonly notice: WritableSignal<string | null> = signal(null);

  public readonly localValue = computed(() => toLocalDateTime(this.value(), this.timeZone()));
  public readonly localMin = computed(() => toLocalDateTime(this.minUtc(), this.timeZone()));
  public readonly localMax = computed(() => toLocalDateTime(this.maxUtc(), this.timeZone()));
  public readonly offset = computed(() => toOffset(this.value(), this.timeZone()));
  public readonly localErrors = computed(() => this._getErrors());

  public onLocalInput(localDateTime: string): void {
    this.notice.set(null);

    if (!localDateTime) {
      this.value.set(null);
      return;
    }

    const timeZone: string = this.timeZone();
    const plainDateTime = Temporal.PlainDateTime.from(localDateTime);
    const earlier = plainDateTime.toZonedDateTime(timeZone, {disambiguation: 'earlier'});
    const later = plainDateTime.toZonedDateTime(timeZone, {disambiguation: 'later'});

    let chosen = earlier;

    if (!earlier.equals(later)) {
      const isGap: boolean = !earlier.toPlainDateTime().equals(plainDateTime);

      if (isGap) {
        // clocks went forward, the wall time never happened: shift it forward by the gap
        chosen = later;
        this.notice.set(
          `${formatLocal(plainDateTime)} does not exist in ${timeZone} (clocks go forward). `
          + `Using ${formatLocal(chosen.toPlainDateTime())} (UTC${chosen.offset}) instead.`);
      } else {
        // clocks went back, the wall time happened twice
        chosen = this.disambiguation() === 'later' ? later : earlier;
        this.notice.set(
          `${formatLocal(plainDateTime)} happens twice in ${timeZone} (clocks go back). `
          + `Using the ${chosen === earlier ? 'first' : 'second'} occurrence (UTC${chosen.offset}).`);
      }
    }

    this.value.set(chosen.toInstant().toString());
  }

  private _getErrors(): ValidationErrors | null {
    const value = this.value();
    if (!value) {
      return this.required() ? {required: true} : null;
    }

    const instant = parseInstant(value);

    if (!instant) {
      return {invalidUtcDateTime: {value}};
    }

    const min = parseInstant(this.minUtc());

    if (min && Temporal.Instant.compare(instant, min) < 0) {
      return {cannotBeBeforeMinUtcDateTime: {value, min: this.minUtc()}};
    }

    const max = parseInstant(this.maxUtc());

    if (max && Temporal.Instant.compare(instant, max) > 0) {
      return {cannotBeAfterMaxUtcDateTime: {value, max: this.maxUtc()}};
    }

    return null;
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
  return plainDateTime.toString({smallestUnit: 'minute'});
}
