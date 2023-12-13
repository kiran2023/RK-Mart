/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CategoryFiltrationService } from './category-filtration.service';

describe('Service: CategoryFiltration', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryFiltrationService],
      imports:[ HttpClientModule ]
    });
  });

  it('should ...', inject([CategoryFiltrationService], (service: CategoryFiltrationService) => {
    expect(service).toBeTruthy();
  }));
});
