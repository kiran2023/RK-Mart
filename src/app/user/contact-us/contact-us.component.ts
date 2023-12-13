import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { ApiUrl, ContactUsValidationData } from 'src/environments/environment';
import { LogService } from '../services/log.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit, OnDestroy {
  contactUs: FormGroup;
  userLogin: boolean | undefined;

  mapUrl = ContactUsValidationData.contactUsComponent.locationUrl;

  queriesUrl = ApiUrl.queries;
  subscriptionData: Subscription|undefined;

  constructor(private title: Title, private formBuilder: FormBuilder, private http: HttpClient, private logger: NGXLogger, private logService: LogService) {
    this.contactUs = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(ContactUsValidationData.contactUsTypescript.usernameRegex)]],
      email: ['', [Validators.required, Validators.pattern(ContactUsValidationData.contactUsTypescript.usermailRegex)]],
      subject: ['', Validators.required],
      textarea: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.title.setTitle('Contact Us | RK MART');
    this.userLogin = Boolean(sessionStorage.getItem('userLoggedIn'));
    if (sessionStorage.getItem('userLoggedIn')) {
      let username = sessionStorage.getItem('userName');
      let email = sessionStorage.getItem('userMail');

      this.contactUs.controls['username'].setValue(username);
      this.contactUs.controls['email'].setValue(email);
    }
  }

  submitQuery(queryData: any) {
    let invalidMessage: any = document.querySelector('#errorMessage');
    if (this.contactUs.valid) {
      let userData = {
        ...queryData,
        queryStatus: 'Pending',
        uid: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : Math.floor(Math.random() * 100000)
      }

      this.subscriptionData = this.http.post(`${this.queriesUrl}`, userData).subscribe((response:any) => {
        if(response){
          !this.userLogin ? invalidMessage.innerHTML = "Query Submitted Successfully We will reach you through Mail" : invalidMessage.innerHTML = "Query Submitted Successfully check back later in query section";
          setTimeout(() => {
            invalidMessage.innerHTML = '';
            this.contactUs.reset();
          }, 5000);
        }
      }, (error: any) => {
        this.logService.fetchError(error);
      });
     
    }
    if (this.contactUs.invalid) {
      invalidMessage.innerHTML = "Enter all the fields";
      setTimeout(() => invalidMessage.innerHTML = '', 3000)
    }
  }

  ngOnDestroy(): void {
    this.subscriptionData?.unsubscribe();
  }
}
