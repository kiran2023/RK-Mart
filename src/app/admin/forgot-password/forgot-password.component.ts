import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiUrl } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  passwordInfo:any;
  subscriptionData: Subscription|undefined;
  constructor(private http : HttpClient) { }

  ngOnInit() {    
    this.subscriptionData = this.http.get(ApiUrl.forgotPasswordRequestUrl).subscribe((data:any)=>{
      this.passwordInfo = data
    })
  }

  ngOnDestroy(): void {
    this.subscriptionData?.unsubscribe();
  }
}
