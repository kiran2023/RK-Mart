import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProductsDataService } from 'src/app/user/services/products-data.service';
import { HttpClient } from '@angular/common/http';
import { HomePageData } from 'src/environments/environment';
import { NGXLogger } from 'ngx-logger';
import { LogService } from '../services/log.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  popUp: any;
  products: any = "";

  landingImage = HomePageData.landingPageImage.landingImage;
  householdCategory = HomePageData.salesImages.householdCategory;
  beveragesCategory = HomePageData.salesImages.beveragesCategory;
  groceriesCategory = HomePageData.salesImages.groceriesCategory;
  salePopupImageUrl = HomePageData.salePopup.salePopupImageUrl;

  groceryProduct: any = [];
  beveragesProduct: any = [];
  householdProduct: any = [];

  offerApply = sessionStorage.getItem("offerApply");;
  offerEnd:Date = new Date();

  public myMath = Math;
  subscriptionData: Subscription|undefined;

  screenWidth: any;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
  }

  constructor(private data: ProductsDataService, private productService:ProductsDataService, private http: HttpClient, private titleService: Title, private logger:NGXLogger, private logService:LogService) {
    this.offerApply = sessionStorage.getItem("offerApply");
    this.screenWidth = window.innerWidth;
  }
  closeOffer() {
    const $offerData: any = document.querySelector('.popupMsg');
    $offerData.close();
  }

  ngOnInit() {
    this.subscriptionData = this.data.getProducts().subscribe(product => {
       this.products = product;
       for (let product of this.products) {
        if (product.category == "grocery") {
          this.groceryProduct.push(product);
        }
        if (product.category == "beverages") {
          this.beveragesProduct.push(product);
        }
        if (product.category == "household") {
          this.householdProduct.push(product);
        }
      }
    }, (error:any) =>{
      this.logService.fetchError(error);
    } );
    this.titleService.setTitle('Home | RK MART');
    this.checkPopUp();
  }

  checkPopUp() {
   let result = sessionStorage.getItem('offerApply');
    if (result=='true') {
      setTimeout(function pop() {
        const $offerData: any = document.querySelector('.popupMsg');
        $offerData.showModal();
      }, 3000);
    }
  }

  ngOnDestroy(): void {
    this.subscriptionData?.unsubscribe();
  }
}

