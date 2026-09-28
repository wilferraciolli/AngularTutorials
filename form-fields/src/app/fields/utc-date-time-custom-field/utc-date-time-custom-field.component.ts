import {ChangeDetectionStrategy, Component, computed, input, model, signal, WritableSignal} from '@angular/core';
import {ValidationErrors} from '@angular/forms';
import {Temporal} from 'temporal-polyfill';
import {
  UTC_DATE_TIME_INVALID_ERROR_LABEL,
  UTC_DATE_TIME_LABEL,
  UTC_DATE_TIME_MAX_ERROR_LABEL,
  UTC_DATE_TIME_MIN_ERROR_LABEL,
  UTC_DATE_TIME_REQUIRED_ERROR_LABEL,
  UtcDateTimeDisambiguation,
} from "../utc-date-time-field/utc-date-time.constants";
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
  selector: 'app-utc-date-time-custom-field',
  styleUrl: './utc-date-time-custom-field.component.scss',
  templateUrl: './utc-date-time-custom-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UtcDateTimeCustomFieldComponent implements FormValueControl<string | null> {
  public value = model<string | null>(null);

  // Component Inputs
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

  // validation inputs
  public requiredErrorLabel = input<string>(UTC_DATE_TIME_REQUIRED_ERROR_LABEL);
  public invalidErrorLabel = input<string>(UTC_DATE_TIME_INVALID_ERROR_LABEL);
  public minErrorLabel = input<string>(UTC_DATE_TIME_MIN_ERROR_LABEL);
  public maxErrorLabel = input<string>(UTC_DATE_TIME_MAX_ERROR_LABEL);

  public readonly inputId: string = `utc-date-time-custom-field-${nextId++}`;

  /** Explains how a DST gap or overlap was resolved for the last value typed by the user. */
  public readonly notice: WritableSignal<string | null> = signal(null);

  // 1. Convert incoming UTC Instant -> Target Timezone -> Split into Date & Time parts for the inputs
  public readonly localDatePartValue = computed(() => {
    const instant = parseInstant(this.value());
    if (!instant) {
      return '';
    }

    // return YYYY-DD-MM
    return instant.toZonedDateTimeISO(this.timeZone())
      .toPlainDate()
      .toString();
  });

  public readonly localTimePartValue = computed(() => {
    const instant = parseInstant(this.value());
    if (!instant) {
      return '';
    }

    // return TT:mm
    return instant.toZonedDateTimeISO(this.timeZone())
      .toPlainTime()
      .toString({smallestUnit: 'minute'});
  });

  public readonly localMin = computed(() => toLocalDateTime(this.minUtc(), this.timeZone()));
  public readonly localMax = computed(() => toLocalDateTime(this.maxUtc(), this.timeZone()));
  public readonly offset = computed(() => toOffset(this.value(), this.timeZone()));

  public readonly localErrors = computed(() => this._getErrors());

  // 2. When user changes the date, combine with existing time and convert back to UTC
  public onDateInput(newDateStr: string) {
    const currentTime = this.localTimePartValue() || '00:00';
    this._updateCombinedDateTime(newDateStr, currentTime);
    console.log('date changes , newDateStr:', newDateStr, 'currentTime:', currentTime);
  }

  // 3. When user changes the time, combine with existing date and convert back to UTC
  public onTimeInput(newTimeStr: string) {
    const currentDate = this.localDatePartValue() || new Date().toISOString().split('T')[0];
    this._updateCombinedDateTime(currentDate, newTimeStr);
    console.log('time changes , newTimeStr:', newTimeStr, 'currentDate:', currentDate);
  }

  private _updateCombinedDateTime(dateStr: string, timeStr: string) {
    this.notice.set(null);

    if (!dateStr || !timeStr) {
      this.value.set(null);
      return;
    }

    try {
      const timeZone: string = this.timeZone();
      const plainDateTime = Temporal.PlainDateTime.from(`${dateStr}T${timeStr}`);
      const earlier = plainDateTime.toZonedDateTime(timeZone, {disambiguation: 'earlier'});
      const later = plainDateTime.toZonedDateTime(timeZone, {disambiguation: 'later'});

      let chosen = earlier;

      if (!earlier.equals(later)) {
        const isGap: boolean = !earlier.toPlainDateTime().equals(plainDateTime);

        if (isGap) {
          chosen = later;
          this.notice.set(
            `${formatLocal(plainDateTime)} does not exist in ${timeZone} (clocks go forward). `
            + `Using ${formatLocal(chosen.toPlainDateTime())} (UTC${chosen.offset}) instead.`
          );
        } else {
          chosen = this.disambiguation() === 'later' ? later : earlier;
          this.notice.set(
            `${formatLocal(plainDateTime)} happens twice in ${timeZone} (clocks go back). `
            + `Using the ${chosen === earlier ? 'first' : 'second'} occurrence (UTC${chosen.offset}).`
          );
        }
      }

      // This correctly updates the signal AND notifies the parent form via CVA
      this.value.set(chosen.toInstant().toString());
    } catch {
      this.value.set(null);
    }
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
