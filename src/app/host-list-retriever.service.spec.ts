import { TestBed } from '@angular/core/testing';

import { HostListRetrieverService } from './host-list-retriever.service';

describe('HostListRetrieverService', () => {
  let service: HostListRetrieverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HostListRetrieverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
