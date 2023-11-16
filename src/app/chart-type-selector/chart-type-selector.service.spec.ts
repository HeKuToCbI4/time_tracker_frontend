import {TestBed} from '@angular/core/testing';

import {ChartTypeSelectorService} from './chart-type-selector.service';

describe('ChartTypeSelectorServiceService', () => {
  let service: ChartTypeSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartTypeSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
