import { TestBed } from '@angular/core/testing';

import { P9ServiceService } from './p9-service.service';

describe('P9ServiceService', () => {
  let service: P9ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(P9ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
