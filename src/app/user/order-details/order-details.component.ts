import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ShippingService } from 'src/app/user/services/shipping.service';
import { UrlGuard } from 'src/app/url.guard';
import { CartService } from 'src/app/user/services/cart.service';
import { ProductsDataService } from 'src/app/user/services/products-data.service';
import { orderDetails } from 'src/environments/environment';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  registeredUserData: any = "";
  activeUserData: any = "";
  orderList:any = [];
  subscriptionData: Subscription[] |undefined = [];

  subTotal:number = 0;
  shippingCharge = orderDetails.shippingCharges;
  gst = orderDetails.gst;

  data:any=""
  constructor(private userData:ProductsDataService, private shippingService:ShippingService, private cartService:CartService, private urlguard:UrlGuard,private title:Title, private logger: NGXLogger) { }

  ngOnInit() {
    this.subscriptionData?.push(this.userData.registeredUser().subscribe((data) => {
      this.registeredUserData = data;

      this.registeredUserData.filter((userData: any) => {
        if(userData.mail == sessionStorage.getItem("userMail")){
          this.activeUserData = userData;
        }
      });
    }));

    this.subscriptionData?.push(this.cartService.getProducts().subscribe( (productData) => {
      this.orderList = productData;

      this.subTotal=this.cartService.getProductTotalAmount();

    }));

    this.title.setTitle('Order Summary | RK MART');
    this.data = sessionStorage.getItem("shippingData");
    this.data =this.data? JSON.parse(this.data):this.shippingService.userShippingData;
  }

  ngOnDestroy(): void {
    this.subscriptionData?.forEach((subscribeData:Subscription)=> subscribeData.unsubscribe());
  }
}
