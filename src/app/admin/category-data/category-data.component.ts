import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminProductsService } from '../services/admin-products.service';
import { Title } from '@angular/platform-browser';
import { errorLogData } from 'src/environments/environment';
import { ApiUrl } from 'src/environments/environment';
import { LogDataService } from '../services/log-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-data',
  templateUrl: './category-data.component.html',
  styleUrls: ['./category-data.component.css']
})
export class CategoryDataComponent implements OnInit, OnDestroy {
  categoryDisplay: any = "";
  categoryCount: number = 0;
  subscriptionData: Subscription[] |undefined = [];

  constructor(private adminService: AdminProductsService, private title:Title, private logData:LogDataService) {
    this.subscriptionData?.push(this.adminService.getCategory().subscribe((data) => {
      this.categoryDisplay = data;
    }, (error)=>{
      let logDataFetched = errorLogData;
      logDataFetched.errorMessage = `Error During Displaying Category  ${JSON.stringify(error)} `;

      this.logData.error(logDataFetched, ApiUrl.adminErrorLogUrl , error);
      alert('Error: Unable to Fetch data from the server.');
    }
    ));
    this.subscriptionData?.push(this.adminService.categoryTypesCount().subscribe((category: any) => this.categoryCount = category.length));
  }

  ngOnInit(): void {
    this.title.setTitle('Category | RK MART');
   }

  removeCategory(categoryId: any, categoryValue: any, categoryClass: any, categoryUniqueValue: any) {
    if(confirm(`Are you sure want to delete ${categoryValue}`)){
      this.adminService.removeCategoryData(categoryId, categoryValue, categoryClass, categoryUniqueValue);
    }
  }

  ngOnDestroy(): void {
    this.subscriptionData?.forEach((subscribeData:Subscription)=> subscribeData.unsubscribe());
  }
} 