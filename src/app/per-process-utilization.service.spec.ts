import { TestBed } from '@angular/core/testing';

import { PerProcessUtilizationService } from './per-process-utilization.service';

describe('PerProcessUtilizationService', () => {
  let service: PerProcessUtilizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerProcessUtilizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
