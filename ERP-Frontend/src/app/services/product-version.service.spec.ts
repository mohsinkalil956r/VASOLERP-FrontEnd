import { TestBed } from '@angular/core/testing';

import { ProductVersionService } from './product-version.service';

describe('ProductVersionService', () => {
  let service: ProductVersionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductVersionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
