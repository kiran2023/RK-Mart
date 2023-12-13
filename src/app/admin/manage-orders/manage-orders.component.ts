import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { ApiUrl } from 'src/environments/environment';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit, OnDestroy {
  orderData: any = [];
  subscriptionData: Subscription[] |undefined = [];

  ordersUrl = ApiUrl.orderUrl;
  orderStatusUpdateUrl = ApiUrl.orderStatusUpdateUrl;

  constructor(private http: HttpClient, private title: Title) {
    this.subscriptionData?.push(this.http.get(`${this.ordersUrl}`).subscribe((orderData: any) => {

      let orderDatas = orderData;

      orderDatas.forEach((orderDatas: any) => {
        let cartData = orderDatas.cartItems;

        cartData.forEach((cart: any) => {
          this.subscriptionData?.push(this.http.get(`${this.orderStatusUpdateUrl}${cart.orderUniqueId}`).subscribe((response: any) => {
            let orderStatus = {
              ...cart,
              customerName: orderDatas.customerName,
              customerAddress: orderDatas.customerAddress,
              orderStatus: response[0].status
            }
            this.orderData.push(orderStatus);
            console.log(this.orderData);
            
          }));
        });
      });
    }));
  }

  ngOnInit() {
    this.title.setTitle('Orders | RK MART');
  }

  ngOnDestroy(): void {
    this.subscriptionData?.forEach((subscribeData:Subscription)=> subscribeData.unsubscribe());
  }
}
