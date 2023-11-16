import { TestBed } from '@angular/core/testing';

import { HostSelectorService } from './host-selector.service';

describe('HostSelectorService', () => {
  let service: HostSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HostSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
