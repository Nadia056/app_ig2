import { TestBed } from '@angular/core/testing';

import { P8ServiceService } from './p8-service.service';

describe('P8ServiceService', () => {
  let service: P8ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(P8ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
