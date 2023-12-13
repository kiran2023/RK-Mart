import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiUrl } from 'src/environments/environment';

@Component({
  selector: 'app-order-status-update',
  templateUrl: './order-status-update.component.html',
  styleUrls: ['./order-status-update.component.css']
})
export class OrderStatusUpdateComponent implements OnInit {
  orderStatus = ['Processing', 'Packed', 'Delivered', 'Cancelled'];
  orderId: any;
  orderData: any;
  orderStatusData: FormGroup;
  subscriptionData: Subscription[] |undefined = [];

  orderStatusUpdateUrl = ApiUrl.orderStatusUpdateUrl;
  orderStatusUrl = ApiUrl.orderStatusUrl;
  ordersAmount = ApiUrl.salesAmountUrl;

  constructor(private router: ActivatedRoute, private formBuilder: FormBuilder, private http: HttpClient, private title: Title) {
    if (this.router.snapshot.paramMap.keys.length > 0) {
      this.subscriptionData?.push(this.router.paramMap.subscribe((url: any) => {
        this.orderId = url.get('orderId');

        this.subscriptionData?.push(this.http.get(`${this.orderStatusUpdateUrl}${this.orderId}`).subscribe((data: any) => {
          this.orderData = data[0];
          this.orderStatusData.controls['orderId'].setValue(this.orderData.orderid);
          this.orderStatusData.controls['status'].setValue(this.orderData.status);
        }));
      }));

    }

    this.orderStatusData = this.formBuilder.group({
      orderId: [, Validators.required],
      status: [, Validators.required]
    });
    this.orderStatusData.markAsPristine();
  }

  updateData() {
    if (!this.orderStatusData.pristine) {
      this.subscriptionData?.push(this.http.get(`${this.orderStatusUpdateUrl}${this.orderId}`).subscribe((data: any) => {
        let id = data[0].id;
        if (this.orderStatusData.controls['status'].value != 'Delivered') {
          this.subscriptionData?.push(this.http.patch(`${this.orderStatusUrl}/${id}`, { status: this.orderStatusData.controls['status'].value }).subscribe((res) => {
            if (res) {
              alert("updated Successfully")
            }
          }));
        }
        if (this.orderStatusData.controls['status'].value == 'Delivered') {
          this.subscriptionData?.push(this.http.patch(`${this.orderStatusUrl}/${id}`, { status: this.orderStatusData.controls['status'].value, delivery: new Date().toLocaleDateString() }).subscribe((res) => {
            if (res) {
              alert("updated Successfully")
            }
          }));
        }
        if (this.orderStatusData.controls['status'].value == 'Cancelled') {
          this.subscriptionData?.push(this.http.get(`${this.ordersAmount}/1`).subscribe((data: any) => {
            if (data) {
              let total = data.totalAmount - this.orderData.amount;
              this.subscriptionData?.push(this.http.put(`${this.ordersAmount}/1`, { totalAmount: total }).subscribe((data: any) => {}));
            }
          }));
        }
      }));
    }
  }
  ngOnInit() {
    this.title.setTitle(`Order ${this.orderId} | RK MART`);
  }
  ngOnDestroy(): void {
    this.subscriptionData?.forEach((subscribeData:Subscription)=> subscribeData.unsubscribe());
  }
}
