import { TestBed } from '@angular/core/testing';

import { CustomLanguageService } from './custom-language.service';

describe('CustomLanguageService', () => {
  let service: CustomLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomLanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
