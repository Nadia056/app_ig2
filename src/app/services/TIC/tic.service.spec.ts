import { TestBed } from '@angular/core/testing';

import { TicService } from './tic.service';

describe('TicService', () => {
  let service: TicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
