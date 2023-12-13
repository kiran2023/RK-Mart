import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription, map } from 'rxjs';
import { cart } from 'src/app/admin/product';
import { CartService } from 'src/app/user/services/cart.service';
import { ApiUrl, myOrdersData } from 'src/environments/environment';
import { NGXLogger } from 'ngx-logger';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  userid = sessionStorage.getItem("userId");
  username = sessionStorage.getItem('userName');
  orderData: any = [];
  orderTotalAmount: any;
  subscriptionData: Subscription[] |undefined = [];

  emptyOrderImage = myOrdersData.emptyOrderImage;

  cartOrderList: cart[] | undefined;

  userRating: { [productId: number]: number } = {};

  orderStatusUpdateUrl = ApiUrl.orderStatusUpdateUrl;
  orderStatusUrl = ApiUrl.orderStatusUrl;
  salesAmountUrl = ApiUrl.salesAmountUrl;
  getProductDataUrl = ApiUrl.getProductDataUrl;

  constructor(private cartService: CartService, private logger:NGXLogger, private http: HttpClient, private title: Title, private logService:LogService ) { }

  ngOnInit() {
    if (sessionStorage.getItem('shippingData')) {
      sessionStorage.removeItem('shippingData');
    }
    this.subscriptionData?.push(this.cartService.ordersData(this.userid).subscribe((data: any) => {
      let orderDetails = data;

      orderDetails.forEach((orderDatas: any) => {
        let cartData = orderDatas.cartItems;

        cartData.forEach((cart: any) => {
          this.subscriptionData?.push(this.http.get(`${this.orderStatusUpdateUrl}${cart.orderUniqueId}`).subscribe((response: any) => {

            let status = response[0].status;
            let delivery = response[0].delivery;
            let orderId = response[0].id;
            let reviewStatus = response[0].reviewStatus;
            let orderStatus = {
              ...cart,
              orderId: orderId,
              orderStatus: status,
              delivery: delivery,
              orderDate: response[0].orderDate,
              reviewStatus: reviewStatus
            }

            let dateNow: Date = new Date();
            let deliveryData = dateNow.toLocaleDateString();

            if (response[0].delivery == deliveryData && dateNow.getHours() > 12) {
              this.subscriptionData?.push(this.http.patch(`${this.orderStatusUrl}/${orderId}`, { deliveryDeadline: true }).subscribe(() => {
                orderStatus.deliveryDeadline = true;
                this.orderData.push(orderStatus);
              }));
            } else {
              this.subscriptionData?.push(this.http.patch(`${this.orderStatusUrl}/${orderId}`, { deliveryDeadline: false }).subscribe(() => {
                orderStatus.deliveryDeadline = false;
                this.orderData.push(orderStatus);
              }));
            }
          }));
        });
      });
    }, (error:any) => {
      this.logService.fetchError(error);
    }));

    this.title.setTitle('My Orders | RK MART');
  }

  cancelOrder(orderId: any, productId: any, quantity: any, date: any) {
    let dateNow: Date = new Date();
    let deliveryData = dateNow.toLocaleDateString();

    if (deliveryData != date || (deliveryData == date && dateNow.getHours() < 12)) {
      if (confirm("Are you Sure you Want to Cancel Order")) {

        let orderDatas;
        let id;
        let amount = 0;
        this.subscriptionData?.push(this.http.get(`${this.orderStatusUpdateUrl}${orderId}`).subscribe((data: any) => {
          orderDatas = data;
          id = orderDatas[0].id;
          amount = orderDatas[0].amount;

          this.subscriptionData?.push(this.http.patch(`${this.orderStatusUrl}/${id}`, { status: "Cancelled" }).subscribe((res) => {
            if (res) {
              this.subscriptionData?.push(this.http.get(`${this.salesAmountUrl}/1`).subscribe((data: any) => {
                if (data) {
                  let total = data.totalAmount - amount;
                  this.subscriptionData?.push(this.http.put(`${this.salesAmountUrl}/1`, { totalAmount: total }).subscribe((data: any) => {
                    alert("Cancelled Successfully");
                  }));
                }
              }));
            }
          }));

          this.subscriptionData?.push(this.http.get(`${this.getProductDataUrl}/${productId}`).subscribe((data: any) => {

            let updatedData = {
              ...data,
              Stock: data.Stock + quantity
            }
            this.subscriptionData?.push(this.http.patch(`${this.getProductDataUrl}/${productId}`, updatedData).subscribe());

          }));
        }));
      }
    } else {
      alert("Order Out For Delivery You Cannot Cancel Order");
    }
  }

  closeOffer() {
    const $offerData: any = document.querySelector('.popupMsg');
    $offerData.close();
  }

  onStarClick(productid: any, rating: number) {
    this.userRating[productid] = rating;
  }

  submitRating(productid: any, orderid: any) {
    this.subscriptionData?.push(this.http.get(`${this.getProductDataUrl}/${productid}`).pipe(
      map((productData: any) => {
        const rating = [...productData.rating, this.userRating[productid]];
        let reviewAverage = rating;

        const sum = reviewAverage.reduce((total: any, currentValue: any) => total + currentValue, 0);
        let avgReviewCount = reviewAverage.length > 0 ? Math.round(sum / reviewAverage.length) : 0;

        this.subscriptionData?.push(this.http.patch(`${this.getProductDataUrl}/${productid}`, { ratingAverage: avgReviewCount }).subscribe((response: any) => {
          if (response) {
            this.updateAverageReview({ ...productData, rating }, avgReviewCount, productid, orderid);
          }
        }));
      })
    ).subscribe());
  }

  updateAverageReview(updatedProductData: any, reviewAverage: any, productid: any, orderid: any) {
    this.subscriptionData?.push(this.updatedRatingData(productid, updatedProductData).subscribe((response: any) => {
      if (response) {
        this.subscriptionData?.push(this.http.patch(`${this.orderStatusUrl}/${orderid}`, { reviewStatus: 'true' }).subscribe((response: any) => {
          if (response) {
            this.subscriptionData?.push(this.http.patch(`${this.getProductDataUrl}/${productid}`, { ratingAverage: reviewAverage }).subscribe());
          }
          alert("Review Submitted Successfully");
        }));
      }
    }));
  }

  updatedRatingData(productid: any, updatedProduct: any) {
    return this.http.patch(`${this.getProductDataUrl}/${productid}`, updatedProduct);
  }

  printOrder(orderData:any){

    let printReceipt = `
    <html lang="en">
    <head>
      <title> ${this.username} - Order ID : ${ orderData.orderUniqueId } - RkMart </title>
      <style>
      .orderBox {
        width: max-content;
        height: max-content;
        padding: 1.5rem;
        margin-top: 1rem;
        background-color: #fff;
        border: 0.1rem solid rgb(29, 106, 193);;
        border-radius: 1rem;
        margin-bottom: 2rem;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }

      h2, .status{
        color:rgb(191, 53, 53);
      }
      span{
        color:rgb(8, 5, 97);
      }
      </style>
    </head>
    <body>

    <h2> RK <span> MART <span> </h2>
    <h4> User Name : ${this.username} </h4>

    <div class="orderBox">
        <div>
          <p> <b> Order Id: </b> ${orderData.orderUniqueId} </p>
          <p> <b> Ordered On : </b> ${orderData.orderDate} </p>
          <div
            ${orderData.orderStatus !=='Delivered' && orderData.orderStatus !=='Cancelled'?'':'style="display:none"'}> <b> Delivery Excepted
              : </b> ${orderData.delivery} </div>
          <div ${orderData.orderStatus =='Delivered'?'':'style="display:none"'}> <b> Delivered On : </b>
            ${orderData.delivery} 
          </div>
        </div>
        <div>
          <div>
            <p> <b> Product : </b> ${ orderData.productName }</p>
            <div>
              <p> <b>Quantity : </b>${ orderData.quantity }</p>
              <p> <b> Total Amount : </b> ${ orderData.originalAmount } </p>
            </div>
          </div>
        </div>
        <div>
        <hr>
        <p> <b> Status : <span class="status"> ${orderData.orderStatus} </span> </b></p>
        <p> <b> Total : </b> ${ orderData.originalAmount * orderData.quantity}</p>
        </div>
    </div>
      
    </body>
    </html>
    `
    let receipt = window.open('','_blank');
    receipt?.document.write(printReceipt);
    receipt?.document.close();
    receipt?.print();
  }
  ngOnDestroy(): void {
    this.subscriptionData?.forEach((subscribeData:Subscription)=> subscribeData.unsubscribe());
  }
}