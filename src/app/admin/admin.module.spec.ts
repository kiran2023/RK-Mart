import { TestBed } from '@angular/core/testing';
import { AdminModule } from './admin.module';

describe('AdminModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AdminModule], // Import your module here for testing
    });
  });

  it('should create the module', () => {
    const module = TestBed.inject(AdminModule);
    expect(module).toBeTruthy();
  });

  // Write more test cases for your module here...
});
