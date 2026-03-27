import {Injectable} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

// ─── Format token (reuse anywhere you need MAT_DATE_FORMATS) ───────────────
export const STRING_DATE_FORMATS = {
  parse:   { dateInput: 'YYYY-MM-DD' },
  display: {
    dateInput:          'DD/MM/YYYY',   // shown in the input box
    monthYearLabel:     'MMM YYYY',
    dateA11yLabel:      'DD MMMM YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

// ─── Adapter ───────────────────────────────────────────────────────────────
@Injectable()
export class StringDateAdapter extends DateAdapter<string> {

  // ── Helpers ──────────────────────────────────────────────────────────────
  private parts(date: string): [number, number, number] {
    const [y, m, d] = date.split('-').map(Number);
    return [y, m - 1, d];   // month is 0-indexed internally
  }

  private pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  private fromParts(year: number, month: number, day: number): string {
    return `${year}-${this.pad(month + 1)}-${this.pad(day)}`;
  }

  // ── Required abstract implementations ────────────────────────────────────
  getYear(date: string):      number { return this.parts(date)[0]; }
  getMonth(date: string):     number { return this.parts(date)[1]; }
  getDate(date: string):      number { return this.parts(date)[2]; }
  getDayOfWeek(date: string): number { return new Date(date + 'T00:00:00').getDay(); }

  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    const fmt = new Intl.DateTimeFormat(this.locale, {month: style});
    return Array.from({length: 12}, (_, i) =>
      fmt.format(new Date(2000, i, 1))
    );
  }

  getDateNames(): string[] {
    return Array.from({length: 31}, (_, i) => String(i + 1));
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    const fmt = new Intl.DateTimeFormat(this.locale, {weekday: style});
    // Sunday = 0 in JS Date
    return Array.from({length: 7}, (_, i) =>
      fmt.format(new Date(2000, 0, 2 + i))  // 2 Jan 2000 = Sunday
    );
  }

  getYearName(date: string): string { return String(this.getYear(date)); }

  getFirstDayOfWeek(): number { return 1; } // Monday

  getNumDaysInMonth(date: string): number {
    const [y, m] = this.parts(date);
    return new Date(y, m + 1, 0).getDate();
  }

  clone(date: string): string { return date; }

  createDate(year: number, month: number, day: number): string {
    return this.fromParts(year, month, day);
  }

  today(): string {
    return new Date().toISOString().substring(0, 10);
  }

  parse(value: any, parseFormat: any): string | null {
    if (!value) return null;
    // Accept ISO (YYYY-MM-DD) or DD/MM/YYYY
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      const [d, m, y] = value.split('/');
      return `${y}-${m}-${d}`;
    }
    return null;
  }

  format(date: string, displayFormat: any): string {
    if (!this.isValid(date)) return '';
    const [y, m, d] = this.parts(date);
    // Display as DD/MM/YYYY in the input
    return `${this.pad(d)}/${this.pad(m + 1)}/${y}`;
  }

  addCalendarYears(date: string, years: number): string {
    const [y, m, d] = this.parts(date);
    return this.fromParts(y + years, m, d);
  }

  addCalendarMonths(date: string, months: number): string {
    const jsDate = new Date(date + 'T00:00:00');
    jsDate.setMonth(jsDate.getMonth() + months);
    return jsDate.toISOString().substring(0, 10);
  }

  addCalendarDays(date: string, days: number): string {
    const jsDate = new Date(date + 'T00:00:00');
    jsDate.setDate(jsDate.getDate() + days);
    return jsDate.toISOString().substring(0, 10);
  }

  toIso8601(date: string): string { return date; }

  isDateInstance(obj: any): boolean {
    return typeof obj === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(obj);
  }

  isValid(date: string): boolean {
    if (!this.isDateInstance(date)) return false;
    const [y, m, d] = this.parts(date);
    const jsDate = new Date(date + 'T00:00:00');
    return jsDate.getFullYear() === y &&
      jsDate.getMonth()    === m &&
      jsDate.getDate()     === d;
  }

  invalid(): string { return 'invalid-date'; }

  override deserialize(value: any): string | null {
    if (value == null || value === '') return null;
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    return null;
  }
}
