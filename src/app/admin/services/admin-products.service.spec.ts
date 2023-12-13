/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdminProductsService } from './admin-products.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('Service: AdminProducts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers: [AdminProductsService, HttpClient]
    });
  });

  it('should ...', inject([AdminProductsService], (service: AdminProductsService) => {
    expect(service).toBeTruthy();
  }));
});
