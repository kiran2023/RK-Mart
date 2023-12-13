/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { DisablePastDatesDirective } from './disable-past-dates.directive';
import { ElementRef } from '@angular/core';

describe('Directive: DisablePastDates', () => {
  const element: any = ElementRef;
  it('should create an instance', () => {
    const directive = new DisablePastDatesDirective(element);
    expect(directive).toBeTruthy();
  });
});
