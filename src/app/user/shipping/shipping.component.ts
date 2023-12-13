import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ShippingService } from 'src/app/user/services/shipping.service';
import { UrlGuard } from 'src/app/url.guard';
import { CartService } from 'src/app/user/services/cart.service';
import { ProductsDataService } from 'src/app/user/services/products-data.service';
import { ShippingPage } from 'src/environments/environment';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit, OnDestroy {
  userShippingData: any = "";

  registeredUserData: any = "";
  activeUserData: any = "";

  mailValidation = ShippingPage.mailValidation;
  alphabetsValidation = ShippingPage.alphabetsValidation;
  mobileValidation = ShippingPage.mobileValidation;
  numberOnlyValidation = ShippingPage.numberValidation;
  subscriptionData: Subscription[] |undefined = [];

  constructor(private userData: ProductsDataService, private cartService:CartService, private shippingService:ShippingService, private urlguard:UrlGuard ,private title: Title, private formBuilder:FormBuilder, private route:Router,  private logger:NGXLogger) {
  }

  shippingForm = this.formBuilder.group(
    {
      customerName: [, [Validators['required'], Validators['pattern']]],
      customerMail: [, [Validators['required'], Validators['pattern']]],
      customerMobile: [, [Validators['required']]],
      customerState: [, [Validators['required']]],
      customerCity: [, [Validators['required']]],
      customerPincode: [, [Validators['required'],Validators['minLength']]],
      customerAddress: [, [Validators['required']]]
    }
  )

  ngOnInit() {
    this.title.setTitle('Shipping | RK MART');
    this.userShippingData = this.userData.activeUser;

    this.subscriptionData?.push(this.userData.registeredUser().subscribe((data) => {
      this.registeredUserData = data;

      this.registeredUserData.filter((userData: any) => {
        if(userData.mail == sessionStorage.getItem("userMail")){
          this.activeUserData = userData;
          this.shippingForm.controls['customerName'].setValue(this.activeUserData.username),
          this.shippingForm.controls['customerMail'].setValue(this.activeUserData.mail),
          this.shippingForm.controls['customerMobile'].setValue(this.activeUserData.mobile)
        }
      });
    }));

    this.urlguard.navigatePermission = false;
  }

  shippingData(val:any){
    let cartItems="";
    this.subscriptionData?.push(this.cartService.getProducts().subscribe((cartData:any)=>{
      cartItems = cartData;
    }));
    
    let uid = sessionStorage.getItem("userId");
    let totalAmount = this.cartService.getProductTotalAmount();
    let userOrderData = {
      ...val,
      cartItems,
      totalAmount,
      uid
    }    
    this.shippingService.userShippingData = userOrderData;
    sessionStorage.setItem('shippingData',JSON.stringify(userOrderData));
    if(this.shippingForm.valid){
      this.urlguard.navigatePermission = true;
      this.urlguard.canActivate();
      this.route.navigate(['cart/shipping/orderDetails']);
    }
  }
  ngOnDestroy(): void {
    this.subscriptionData?.forEach((subscribeData:Subscription)=> subscribeData.unsubscribe());
  }
}
