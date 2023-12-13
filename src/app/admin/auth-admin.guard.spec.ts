import { TestBed } from '@angular/core/testing';
import { AuthAdminGuard } from './auth-admin.guard';
import { HttpClientModule } from '@angular/common/http';

describe('authAdmin', () => {
  let guard: AuthAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ HttpClientModule ]
    });
    guard = TestBed.inject(AuthAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
