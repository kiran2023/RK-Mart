/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductsDataService } from './products-data.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: ProductsData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsDataService],
      imports:[ HttpClientModule ]
    });
  });

  it('should ...', inject([ProductsDataService], (service: ProductsDataService) => {
    expect(service).toBeTruthy();
  }));
});
