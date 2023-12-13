import { TestBed } from '@angular/core/testing';
import { AppModule } from './app.module';

describe('AppModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule], // Import your module here for testing
    });
  });

  it('should create the module', () => {
    const module = TestBed.inject(AppModule);
    expect(module).toBeTruthy();
  });

  // Write more test cases for your module here...
});
