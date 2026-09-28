import { Pipe, PipeTransform } from '@angular/core';
import { Temporal } from 'temporal-polyfill';

@Pipe({
  name: 'temporalFormat',
  standalone: true
})
export class TemporalFormatPipe implements PipeTransform {
  transform(
    value: Temporal.Instant | Temporal.ZonedDateTime | Temporal.PlainDateTime | string | null,
    timeZone?: string,
    hour12: boolean = false
  ): string {
    if (!value) return '';

    try {
      // 1. Normalize input to a ZonedDateTime or PlainDateTime
      let zdt: Temporal.ZonedDateTime;

      if (typeof value === 'string') {
        const instant = Temporal.Instant.from(value);
        zdt = timeZone ? instant.toZonedDateTimeISO(timeZone) : instant.toZonedDateTimeISO('UTC');
      } else if (value instanceof Temporal.Instant) {
        zdt = timeZone ? value.toZonedDateTimeISO(timeZone) : value.toZonedDateTimeISO('UTC');
      } else if (value instanceof Temporal.PlainDateTime) {
        // If it's a PlainDateTime, bind it to a timezone if provided
        zdt = timeZone ? value.toZonedDateTime(timeZone) : value.toZonedDateTime('UTC');
      } else {
        zdt = value;
        if (timeZone && zdt.timeZoneId !== timeZone) {
          zdt = zdt.withTimeZone(timeZone);
        }
      }

      // 2. Format based on 12-hour or 24-hour preference
      return zdt.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        hour12: hour12
      });
    } catch {
      return '';
    }
  }
}
