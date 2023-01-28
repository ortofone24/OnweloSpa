import { TestBed } from '@angular/core/testing';

import { OnweloService } from './onwelo.service';

describe('OnweloService', () => {
  let service: OnweloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnweloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
