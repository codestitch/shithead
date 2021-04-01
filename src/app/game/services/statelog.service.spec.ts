import { TestBed } from '@angular/core/testing';

import { StatelogService } from './statelog.service';

describe('StatelogService', () => {
  let service: StatelogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatelogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
