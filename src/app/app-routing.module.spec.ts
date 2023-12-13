import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

import { ContactUsComponent } from './user/contact-us/contact-us.component';
import { HomeComponent } from 'src/app/user/home/home.component';
import { ProductsComponent } from './user/products/products.component';
import { HttpClientModule } from '@angular/common/http';


describe('AppRoutingModule', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [AppRoutingModule, RouterTestingModule.withRoutes([]), HttpClientModule], 
        declarations: [HomeComponent, ContactUsComponent, ProductsComponent],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should redirect to home component when navigating to "/"', fakeAsync(() => {
    router.navigate(['']); 
    tick();

    expect(location.path()).toBe('/home');
  }));
  it('should redirect to cart component when navigating to "/"', fakeAsync(() => {
    router.navigate(['products']); 
    tick();

    expect(location.path()).toBe('/products');
  }));
  it('should redirect to contactUs component when navigating to "/"', fakeAsync(() => {
    router.navigate(['contactUs']); 
    tick();

    expect(location.path()).toBe('/contactUs');
  }));
  
});
