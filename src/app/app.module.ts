// TN Review - 1
// Reviewer    : Anitha Manogaran
// Date        : October 25, 2022
// Participant : Kiran N
// Mentors     : Snigdha Agarwal, Naveen Subramaniam

// TN Review - 2
// Reviewer    : Sabapathi Shanmugam
// Date        : June 13, 2023
// Participant : Kiran N
// Mentors     : Snigdha Agarwal, Naveen Subramaniam

// SL Review
// Reviewer    : Logeswari Rengan
// Date        : July 17, 2023
// Participant : Kiran N
// Mentors     : Savitha Ragunathan, Anushya Narayanan

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './user/home/home.component';
import { ProductsComponent } from './user/products/products.component';
import { ContactUsComponent } from './user/contact-us/contact-us.component';
import { CartComponent } from './user/cart/cart.component';
import { ProductDescriptionComponent } from './user/product-description/product-description.component';
import { CategoryComponent } from './user/category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './user/footer/footer.component';
import { MaintenanceComponent } from './user/maintenance/maintenance.component';
import { MenuComponent } from './user/menu/menu.component';
import { ShippingComponent } from './user/shipping/shipping.component';
import { OrderDetailsComponent } from './user/order-details/order-details.component';
import { PaymentComponent } from './user/payment/payment.component';
import { MyOrdersComponent } from './user/my-orders/my-orders.component';
import { AdminModule } from './admin/admin.module';
import { OrderStatusUpdateComponent } from './admin/order-status-update/order-status-update.component';
import { QueryComponent } from './user/query/query.component';
import { OfferTimerComponent } from './user/offer-timer/offer-timer.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { DiscountPipe } from './user/discount.pipe';
import { OrderStatusDirective } from './user/order-status.directive';
import { DisablePastDatesDirective } from './user/disable-past-dates.directive';

@NgModule({
  declarations: [																				
      AppComponent,
      HomeComponent,
      ProductsComponent,
      ContactUsComponent,
      CartComponent,
      ProductDescriptionComponent,
      ProductDescriptionComponent,
      CategoryComponent,
      FooterComponent,
      MaintenanceComponent,
      MenuComponent,
      ShippingComponent,
      OrderDetailsComponent,
      PaymentComponent,
      MyOrdersComponent,
      OrderStatusUpdateComponent,
      QueryComponent,
      OfferTimerComponent,
      ProductsComponent,
      DiscountPipe,
      OrderStatusDirective,
      DisablePastDatesDirective
   ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AdminModule,
    LoggerModule.forRoot({
      serverLoggingUrl: '',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR
    }),
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
