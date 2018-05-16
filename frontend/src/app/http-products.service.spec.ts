import { TestBed, inject } from '@angular/core/testing';

import { HttpProductsService } from './http-products.service';

describe('HttpProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpProductsService]
    });
  });

  it('should be created', inject([HttpProductsService], (service: HttpProductsService) => {
    expect(service).toBeTruthy();
  }));
});
