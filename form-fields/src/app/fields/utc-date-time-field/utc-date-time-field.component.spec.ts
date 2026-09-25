import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { UtcDateTimeFieldComponent } from './utc-date-time-field.component';

@Component({
  imports: [ReactiveFormsModule, UtcDateTimeFieldComponent],
  template: `
    <app-utc-date-time-field
      [formControl]="control"
      [timeZone]="timeZone()"
      [required]="true"
      [min]="'2024-01-01T00:00:00Z'"
      [max]="'2025-12-31T23:59:00Z'"
    />
  `
})
class HostComponent {
  control = new FormControl<string | null>('2024-05-01T09:00:00Z');
  timeZone = signal('Europe/London');
}

describe('UtcDateTimeFieldComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  let input: HTMLInputElement;

  const type = (value: string): void => {
    input.value = value;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  };

  const text = (): string => fixture.nativeElement.textContent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    input = fixture.debugElement.query(By.css('input')).nativeElement;
  });

  it('should display the UTC value in the selected timezone', () => {
    expect(input.value).toBe('2024-05-01T10:00');
    expect(text()).toContain('UTC+01:00');
  });

  it('should keep the UTC value and update the display when the timezone changes', () => {
    host.timeZone.set('America/Sao_Paulo');
    fixture.detectChanges();

    expect(input.value).toBe('2024-05-01T06:00');
    expect(host.control.value).toBe('2024-05-01T09:00:00Z');
  });

  it('should emit a UTC value when the user enters a local date and time', () => {
    type('2024-01-15T09:00');
    expect(host.control.value).toBe('2024-01-15T09:00:00Z');

    type('2024-07-15T09:00');
    expect(host.control.value).toBe('2024-07-15T08:00:00Z');
  });

  it('should shift a non-existent time forward and explain why (clocks going forward)', () => {
    type('2024-03-31T01:30');

    expect(host.control.value).toBe('2024-03-31T01:30:00Z');
    expect(input.value).toBe('2024-03-31T02:30');
    expect(text()).toContain('does not exist');
  });

  it('should use the first occurrence of a repeated time by default (clocks going back)', () => {
    type('2024-10-27T01:30');

    expect(host.control.value).toBe('2024-10-27T00:30:00Z');
    expect(text()).toContain('happens twice');
  });

  it('should validate required, invalid, min and max', () => {
    type('');
    expect(host.control.errors).toEqual({ required: true });

    host.control.setValue('not a date');
    expect(host.control.hasError('invalidUtcDateTime')).toBeTrue();

    type('2023-06-01T09:00');
    expect(host.control.hasError('cannotBeBeforeMinUtcDateTime')).toBeTrue();

    type('2026-06-01T09:00');
    expect(host.control.hasError('cannotBeAfterMaxUtcDateTime')).toBeTrue();

    type('2024-06-01T09:00');
    expect(host.control.valid).toBeTrue();
  });

  it('should not mark the control dirty or touched when the value is written by the form', () => {
    host.control.setValue('2024-02-01T09:00:00Z');

    expect(host.control.dirty).toBeFalse();
    expect(host.control.touched).toBeFalse();
  });
});
