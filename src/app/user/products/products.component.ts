import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, Subject, Subscription, debounceTime, filter } from 'rxjs';
import { CartService } from 'src/app/user/services/cart.service';

import { ProductsDataService } from 'src/app/user/services/products-data.service';
import { CategoryFiltrationService } from '../services/category-filtration.service';
import { ProductPageData } from 'src/environments/environment';
import { NGXLogger } from 'ngx-logger';
import { DiscountPipe } from '../discount.pipe';
import { HttpClient } from '@angular/common/http';
import { LogService } from '../services/log.service';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  isScrollActive = false;
  productNotFoundImage = ProductPageData.productNotFoundImage;
  CartService!: CartService;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrollActive = window.pageYOffset > 100;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  filteredProducts: any = [];
  selectedCategory: Subscription | undefined;
  selectedDiscount: Subscription | undefined;
  selectedReview: Subscription | undefined;
  filteredProduct: Subscription | undefined;
  

  public myMath = Math;
  productDataFound: any;

  productsData: any = [];
  requiredProduct: string | null | undefined = "";
  searchData: string = "";
  productFound: boolean = true;
  updatedProducts: any = [];
  allProducts: any = [];

  searchProductAvailabilitiy: boolean | undefined;
  subscriptionData: Subscription[] |undefined = [];
  categoryData: string | undefined | null;

  offerApply: any;
  searchProductData = new BehaviorSubject('');

  @ViewChild(CategoryComponent) categoryComponent!: CategoryComponent;

  constructor(private data: ProductsDataService, private categoryFilter: CategoryFiltrationService, private cartService: CartService, private titleService: Title, private activeRoute: ActivatedRoute, private filtration: CategoryFiltrationService, private logger: NGXLogger, private http: HttpClient, private logService: LogService) {
    this.subscriptionData?.push(this.activeRoute.paramMap?.subscribe((urlData) => {
      this.categoryData = urlData.get('category');
    }));

    try {
      if (this.categoryData) {
        this.subscriptionData?.push(this.data.getProducts().subscribe((productData: any) => {
          this.subscriptionData?.push(this.activeRoute.paramMap.subscribe((urlData: ParamMap) => {

            this.productsData = productData;
            this.requiredProduct = urlData.get('category');
            this.titleService.setTitle(`${this.requiredProduct?.charAt(0)?.toUpperCase()}${this.requiredProduct?.slice(1)}  | RK MART`);

            this.updatedProducts = this.productsData.filter((product: any) => product.category == this.requiredProduct);
            this.allProducts = this.productsData.filter((product: any) => product.category == this.requiredProduct);
          }));
        }, (error: any) => {
          this.logService.fetchError(error);
        }));
      } else {
        this.subscriptionData?.push(this.data.getProducts().subscribe((productData: any) => {
          this.updatedProducts = productData;
          this.allProducts = productData
        }, (error: any) => {
          this.logService.fetchError(error);
        }));
      }
    } catch (error: any) {
      this.logService.fetchError(error);
    }


  }

  dataValue: any = [];
  ngOnInit() {

    this.offerApply = sessionStorage.getItem("offerApply");
    this.titleService.setTitle('Products | RK MART');

    this.subscriptionData?.push(this.selectedCategory = this.filtration.selectedCategoriesSubject.subscribe(() => this.filterProduct()));

    this.subscriptionData?.push(this.selectedDiscount = this.filtration.selectedDiscountSubject.subscribe(() => this.filterProduct()));

    this.subscriptionData?.push(this.selectedReview = this.filtration.selectedReviewSubject.subscribe(() => this.filterProduct()));

    this.subscriptionData?.push(this.selectedReview = this.filtration.selectedReviewSubject.subscribe(() => this.filterProduct()));

    this.subscriptionData?.push(this.filteredProduct = this.filtration.selectedCategoriesProductSubject.subscribe((data: any) => {
      this.dataValue = data;
      this.filterProduct();
    }));

  }
  filterValues: any = [];
  ngAfterViewInit() {
    this.subscriptionData?.push(this.searchProductData.pipe(debounceTime(2000)).subscribe(newValue => {
      if (newValue.length != 0) {
        let idDatas: any = [];
        let productsData: any = [];
        this.filterValues = [];

        this.categoryFilter.selectedCategoriesSubject.next([]);
        this.categoryFilter.selectedCategoriesProductSubject.next([]);

        this.updatedProducts.forEach((product: any) => {
          if (product.title.toLowerCase().includes(newValue) && newValue != '') {
            idDatas.push(product.filterValue);
            productsData.push(product.uniqueId);
            this.filterValues.push(product.filterValue)
          }
        });
        if (idDatas.length != 0) {
          idDatas.forEach((id: any) => this.categoryComponent.categorySelected(id, ''));
          productsData.forEach((productuniqueId: any) => this.categoryFilter.selectedCategoriesProduct(productuniqueId));
        } else if (this.filterValues.length == 0) {
          this.updatedProducts = [];
        }
      } else if (newValue.length == 0) {
        this.categoryFilter.selectedCategoriesSubject.next([]);
        this.checkBoxData();
        this.updatedProducts = this.allProducts;
      }
    }));
  }

  filterProduct() {
    let categoryData = this.filtration.getSelectedCategories();
    let discountData = this.filtration.getSelectedDiscount();
    let reviewData = this.filtration.getSelectedReviews();
    let filteredProductData = this.filtration.getFilteredProducts();

    if (categoryData.length != 0 || discountData.length != 0 || reviewData.length != 0) {

      this.updatedProducts = [];
      let filterProducts:any = [];

      this.allProducts.filter((product: any) => {
        if (categoryData.length != 0 && discountData.length == 0 && reviewData.length == 0) {
          if (categoryData.includes(product.filterValue) && filteredProductData.includes(product.uniqueId)) {
            this.updatedProducts.push(product);
          } else if (!this.filterValues.includes(product.filterValue) && categoryData.includes(product.filterValue)) {
            this.updatedProducts.push(product);
          }
        }
        if ((categoryData.length != 0 || categoryData.length == 0) && discountData.length != 0 || reviewData.length != 0) {
          let minimumValue = discountData.length != 0 ? Math.min(...discountData) : 0;
          let minimumReview = reviewData.length != 0 ? Math.min(...reviewData) : 0;

          if (categoryData.includes(product.filterValue) && filteredProductData.length == 0 && this.transformData(((product.originalAmount - product.discounted) / product.discounted)) >= minimumValue && product.ratingAverage >= minimumReview) {
            this.updatedProducts.push(product);

          } else if (categoryData.includes(product.filterValue) && filteredProductData.length != 0 && filteredProductData.includes(product.uniqueId) && this.transformData(((product.originalAmount - product.discounted) / product.discounted)) >= minimumValue && product.ratingAverage >= minimumReview) {
            this.updatedProducts.push(product);
          } else if (!this.filterValues.includes(product.filterValue) && categoryData.includes(product.filterValue) && this.transformData(((product.originalAmount - product.discounted) / product.discounted)) >= minimumValue && product.ratingAverage >= minimumReview) {
            this.updatedProducts.push(product);
          } else if (categoryData.length == 0 && this.transformData(((product.originalAmount - product.discounted) / product.discounted)) >= minimumValue && product.ratingAverage >= minimumReview) {
            this.updatedProducts.push(product);
            if(!filterProducts.includes(product.filterValue)){
              filterProducts.push(product.filterValue);
            }
          }
        }
      });
      let checkboxValues = document.querySelectorAll(".check");
      checkboxValues.forEach((data: any) =>{
        if(data.disabled==true){
          data.checked = false;
          data.disabled=false;
        }else{
          data.checked=false;
        }
      } )
      this.updatedProducts.forEach((product: any) => {
        const checkboxElement = document.querySelector(`.p-btn--${product.filterValue}`) as HTMLInputElement;
        if (checkboxElement) {
          const dataBtnNum = checkboxElement.getAttribute('data-btn-num');
          if (dataBtnNum) {
            checkboxElement.checked = true;
          }
        }
      });
      if(filterProducts.length!=0){
        this.checkBoxData('discountFiltration');
        this.updatedProducts.forEach((product: any) => {
          const checkboxElement = document.querySelector(`.p-btn--${product.filterValue}`) as HTMLInputElement;
          if (checkboxElement) {
            const dataBtnNum = checkboxElement.getAttribute('data-btn-num');
            if (dataBtnNum) {
              checkboxElement.disabled=false;
              checkboxElement.checked = true;
            }
          }
        })
      }
    } else {
      this.updatedProducts = this.allProducts;
      this.checkBoxData();
    }
  }

  checkBoxData(discountFiltration?: any) {
    let checkboxValues = document.querySelectorAll(".check");
    checkboxValues.forEach((data: any) => {
      data.checked = false;
      if (discountFiltration) {
        data.disabled = true;
      }
      if(data.disabled==true && !discountFiltration){
        data.checked = false;
        data.disabled=false;
      }else{
        data.checked=false;
      }
    })
  }

  transformData(Amount: any) {
    const discountTransform = new DiscountPipe();

    return discountTransform.transform(Amount);
  }

  searchProduct(data: any) {
    this.searchProductData.next(data);
  }

  addtoCartData(productAddtoCart: any, productID: any) {
    if (this.data.userLogin) {
      this.cartService.addToCart(productAddtoCart);
    } else {
      alert("Login to add product to Cart");
    }
  }

  ngOnDestroy(): void {
    this.subscriptionData?.forEach((subscribeData:Subscription)=> subscribeData.unsubscribe());
  }
}