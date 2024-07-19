import { TestBed } from '@angular/core/testing';

import { DateTimeFormBuilderService } from './date-time-form-builder.service';

describe('DateTimeFormBuilderService', () => {
  let service: DateTimeFormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateTimeFormBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
