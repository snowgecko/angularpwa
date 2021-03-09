import { TestBed } from '@angular/core/testing';

import { IdbserviceService } from './idbservice.service';

describe('IdbserviceService', () => {
  let service: IdbserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdbserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
