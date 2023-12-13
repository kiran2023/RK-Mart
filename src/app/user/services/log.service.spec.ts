/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LogService } from './log.service';
import { NGXLogger } from 'ngx-logger';
import { HttpClientModule } from '@angular/common/http';

describe('Service: Log', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogService]
    });
  });

  it('should ...', inject([LogService], (service: LogService) => {
    expect(service).toBeTruthy();
  }));
});

beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [],
    imports:[ HttpClientModule ],
    providers: [
      {
        provide: NGXLogger,
        useValue: {
          // Create a mock of NGXLogger if needed
        },
      },
      LogService
    ],
  }).compileComponents();
});