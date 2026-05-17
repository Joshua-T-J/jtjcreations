import { TestBed } from '@angular/core/testing';

import { Gallery } from './gallery';

describe('Gallery', () => {
  let service: Gallery;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Gallery);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
