import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CartService } from 'src/app/user/services/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiUrl, PaymentData, paymentError } from 'src/environments/environment';
import { NGXLogger } from "ngx-logger";
import { LogService } from '../services/log.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {
  expiryDate: string | undefined;

  orderStatusUrl = ApiUrl.orderStatusUrl;
  salesAmountUrl = ApiUrl.salesAmountUrl;
  getProductDataUrl = ApiUrl.getProductDataUrl;
  paymentUrl = ApiUrl.paymentUrl;
  subscriptionData: Subscription[] |undefined = [];

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    return `${year}-${String(month).padStart(2, '0')}`;
  }

  paymentAmount: number = 0;
  data: any = "";
  status: any = []; 
  totalAmountData:any;
  payment: FormGroup;

  updateRequests: any = [];
  paymentStatus: string = "Payment Done";
  accountValidation = PaymentData.accountNumberValidation;
  cvvNumberValidation = PaymentData.cvvNumberValidation;

  constructor(private cartService: CartService, private http: HttpClient, private formBuilder: FormBuilder, private title: Title, private logger: NGXLogger, private logService:LogService) {
    this.payment = this.formBuilder.group({
      accountNumber: [, [Validators.required, Validators.pattern(this.accountValidation), Validators.minLength(16), Validators.maxLength(16)]],
      cardType: [, Validators.required],
      expiry: [, Validators.required],
      cvv: [, [Validators.required, Validators.pattern(this.cvvNumberValidation), Validators.minLength(3), Validators.maxLength(3)]]
    });
  }

  ngOnInit() {
    this.paymentAmount = this.cartService.getProductTotalAmount();

    this.title.setTitle('Payment | RK MART');
    let extractedData: any = sessionStorage.getItem("shippingData");
    this.data = JSON.parse(extractedData);
  }

  paymentModal() {
    try {
      if (this.payment.valid) {
        this.data.cartItems.forEach((product: any) => {
          let date: Date = new Date();
          date.setDate(date.getDate() + PaymentData.expectedDeliveryData);
          let deliveryData = date.toLocaleDateString();

          this.subscriptionData?.push(this.http.get(`${this.getProductDataUrl}/${product.productid}`).subscribe((data: any) => {

            let updatedData = {
              ...data,
              Stock: data.Stock - product.quantity
            }

            let orderId = {
              orderid: product.orderUniqueId,
              productid: product.productid,
              amount: product.originalAmount * product.quantity,
              status: 'Processing',
              deliveryDeadline: false,
              delivery: deliveryData,
              orderDate: new Date().toLocaleDateString(),
              Stock: data.Stock - product.quantity,
              reviewStatus: 'false'
            }

            let payment = {
              orderid: product.orderUniqueId,
              productid: product.productid,
              uid: product.uid,
              status: this.paymentStatus,
            };

            this.subscriptionData?.push(this.http.patch(`${this.getProductDataUrl}/${product.productid}`, updatedData).subscribe());

            this.subscriptionData?.push(this.http.post(`${this.orderStatusUrl}`, orderId).subscribe());

            this.subscriptionData?.push(this.http.post(`${this.paymentUrl}`, payment).subscribe());

            this.subscriptionData?.push(this.http.get(`${this.salesAmountUrl}/1`).subscribe((data: any) => {
              this.totalAmountData = data.totalAmount + product.originalAmount * product.quantity;
              if (data) {
                let total = data.totalAmount + product.originalAmount * product.quantity;
                this.subscriptionData?.push(this.http.put(`${this.salesAmountUrl}/1`, { totalAmount: total }).subscribe((data: any) => {
                  if (data) {
                    sessionStorage.removeItem('shippingData');
                  }
                }));
              }
            }, (error) => {
              const logData = paymentError;
              logData.message = `User ${JSON.stringify(this.totalAmountData)} Payment Error data: ${JSON.stringify(sessionStorage.getItem('userId'))}`;
              logData.shippingData =  `${JSON.stringify(sessionStorage.getItem('shippingData'))}`;
              this.logService.error(logData,ApiUrl.paymentErrorLogData);
            }))
          }))
        })

        this.subscriptionData?.push(this.cartService.order(this.data).subscribe((response) => {
          if (response) {
            let paymentModal: any = document.querySelector(".paymentModal");
            paymentModal.showModal();
          }
        }));
      } else {
        let errorMessage: any = document.querySelector('#errorMessage');
        errorMessage.innerHTML = "Enter all the Fields";
        setTimeout(() => errorMessage.innerHTML = '', 3000);
      }
    } catch (error) {
      const logData = paymentError;
      logData.message = `User Payment Error data: ${JSON.stringify(sessionStorage.getItem('userId'))}`;
      logData.shippingData = `${sessionStorage.getItem("shippingData")}`;
      this.logService.error(logData,ApiUrl.paymentErrorLogData);
    }
  }

  ngOnDestroy(): void {
    this.subscriptionData?.forEach((subscribeData:Subscription)=> subscribeData.unsubscribe());
  }
}
