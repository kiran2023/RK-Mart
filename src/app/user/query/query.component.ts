import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';
import { ApiUrl, QueryPage } from 'src/environments/environment';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})

export class QueryComponent implements OnInit, OnDestroy {
  queryAddressedData: any;
  query: boolean = false;
  queriesSpecificUrl = ApiUrl.queriesSpecificUrl;
  noQueriesFoundImage = QueryPage.noQueriesFoundImage;
  subscriptionData: Subscription|undefined;
  
  constructor(private http: HttpClient, private title:Title, private logger:NGXLogger) {
    let userId = sessionStorage.getItem('userId');

    this.subscriptionData = this.http.get(`${this.queriesSpecificUrl}${userId}`).subscribe((data) => {

      if (data != '') {
        this.queryAddressedData = data;
        this.query = true;
      } else {
        this.query = false;
      }
    })
  }

  ngOnInit() {
    this.title.setTitle('My Queries | RK MART');
  }

  ngOnDestroy(): void {
    this.subscriptionData?.unsubscribe();
  }

}
