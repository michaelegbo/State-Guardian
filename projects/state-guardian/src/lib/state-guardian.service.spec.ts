import { TestBed } from '@angular/core/testing';

import { StateGuardianService } from './state-guardian.service';

describe('StateGuardianService', () => {
  let service: StateGuardianService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateGuardianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
