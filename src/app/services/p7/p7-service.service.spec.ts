import { TestBed } from '@angular/core/testing';

import { P7ServiceService } from './p7-service.service';

describe('P7ServiceService', () => {
  let service: P7ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(P7ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
