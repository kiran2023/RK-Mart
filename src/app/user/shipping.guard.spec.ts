import { TestBed } from '@angular/core/testing';
import { ShippingGuardGuard } from './shipping-guard.guard';

describe('ShippingGuardGuard', () => {
  let guard: ShippingGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ShippingGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
