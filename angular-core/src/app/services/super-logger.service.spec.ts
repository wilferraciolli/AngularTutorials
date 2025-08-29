import { TestBed } from '@angular/core/testing';

import { SuperLoggerService } from './super-logger.service';

describe('SuperLoggerService', () => {
  let service: SuperLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
