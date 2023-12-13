import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ApiUrl } from 'src/environments/environment';

@Component({
  selector: 'app-payment-data',
  templateUrl: './payment-data.component.html',
  styleUrls: ['./payment-data.component.css']
})
export class PaymentDataComponent implements OnInit, OnDestroy {
  paymentInfo:any=""
  subscriptionData: Subscription|undefined ;

  paymentUrl = ApiUrl.paymentUrl;
  constructor(private http:HttpClient ,private title:Title) {
    this.subscriptionData = this.http.get(`${this.paymentUrl}`).subscribe((data)=>{
      this.paymentInfo = data;
    })
   }

  ngOnInit() {
    this.title.setTitle('Payments | RK MART');
  }
  ngOnDestroy(): void {
    this.subscriptionData?.unsubscribe();
  }
}
