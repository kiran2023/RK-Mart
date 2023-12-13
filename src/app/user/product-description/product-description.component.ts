import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from 'src/app/admin/product';
import { ApiUrl, ProductDescriptionData } from 'src/environments/environment';
import { CartService } from 'src/app/user/services/cart.service';
import { ProductsDataService } from 'src/app/user/services/products-data.service';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css']
})
export class ProductDescriptionComponent implements OnInit, OnDestroy {
  public myMath = Math;

  allProducts: any;
  requiredProduct: string | null | undefined;
  finalProduct: any;
  userLoggedin: boolean | undefined = this.productDataService.userLogin;

  categoryData: string | null = "";
  featuredProducts: any = [];
  getProductDataUrl = ApiUrl.getProductDataUrl;
  stockAvailibility: boolean | undefined = true;

  removeProduct: boolean = false;
  removeCartProduct: cart | null | undefined;
  pid: number | string | undefined;
  subscriptionData: Subscription[] |undefined = [];

  offerApply: any;
  offerEnd: Date = new Date();

  screenWidth: any;

  featuredProductsImage = ProductDescriptionData.featuredProductsImage;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
  }

  constructor(private productDataService: ProductsDataService, private cartService: CartService, private route: ActivatedRoute, private titleService: Title, private http: HttpClient, private logger: NGXLogger) {
    this.userLoggedin = Boolean(sessionStorage.getItem("userLoggedIn")) || this.productDataService.userLogin;
    this.productDataService.userLogin = this.userLoggedin;
    this.subscriptionData?.push(this.route.paramMap.subscribe(urlData => {

      this.subscriptionData?.push(this.productDataService.getProducts().subscribe(product => {
        this.allProducts = product;

        this.requiredProduct = urlData.get('productID');
        this.removeProduct = false;

        this.subscriptionData?.push(this.http.get(`${this.getProductDataUrl}/${this.requiredProduct}`).subscribe((productData: any) => {
          if (productData.Stock > 0) {
            this.stockAvailibility = false;
          }
        }));

        this.finalProduct = this.allProducts.find((product: product) => product.id == this.requiredProduct);
        console.log(this.finalProduct);

        this.cartService.getUsersCartList(sessionStorage.getItem("userId"));
        this.loadFeaturedProducts();
        this.cartData();

        this.titleService.setTitle(`${this.finalProduct?.title} | RK MART`);
      }));
    }));
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.offerApply = sessionStorage.getItem('offerApply');
  }

  loadFeaturedProducts() {
    let index = 0;
    this.featuredProducts = [];
    for (let product of this.allProducts) {
      if (this.finalProduct.category == product.category && (this.finalProduct.id != product.id && index <= 3)) {
        index++;
        this.featuredProducts.push(product);
      }
    }
  }

  cartData() {
    let productFound: boolean | undefined = false;
    this.subscriptionData?.push(this.cartService.getProducts().subscribe((products: any) => {
      products.filter((product: any) => {
        if (product.productid == this.requiredProduct) {
          this.removeCartProduct = product;
          this.removeProduct = true;
          productFound = true;
        }
      });
    }));
    !productFound ? this.removeProduct = false : this.removeProduct;
  }

  loginStatusData(loginData: boolean) {
    this.cartService.getUsersCartList(sessionStorage.getItem("userId"));
    this.cartData();
    this.userLoggedin = loginData;
  }

  addtoCartData() {
    if (this.productDataService.userLogin) {

      let uid = sessionStorage.getItem('userId');
      let offerPrice = this.offerApply == 'true' ? this.finalProduct.originalAmount : this.finalProduct.discounted;

      let dataToCart: cart = {
        productName: this.finalProduct.productName,
        title: this.finalProduct.title,
        image: this.finalProduct.image,
        productUniqueId: this.finalProduct.uniqueId,
        quantity: 1,
        originalAmount: offerPrice,
        actualAmount: this.finalProduct.originalAmount,
        discountedPrice: this.finalProduct.discounted,
        productid: this.finalProduct.id,
        uid,
        orderUniqueId: Math.floor(Math.random() * 100000),
        id: undefined
      }
      delete dataToCart.id;

      this.cartService.addToCart(dataToCart)?.subscribe((res: any) => {
        if (res) {
          this.removeProduct = true;
          let success: any = document.querySelector('#addedCartMessage');
          success.innerHTML = `<b> ${dataToCart.title} Added to the Cart <b>`;
          setTimeout(() => success.innerHTML = '', 3000);
        } else {
          alert("error");
        }
      });
    } else {
      alert("Login to add product to Cart");
    }
  }

  deleteFromCart() {
    this.subscriptionData?.push(this.cartService.removeProduct(this.removeCartProduct!, sessionStorage.getItem('userId'))?.subscribe());
    this.removeProduct = false;
  }

  ngOnDestroy(): void {
    this.subscriptionData?.forEach((subscribeData:Subscription)=> subscribeData.unsubscribe());
  }
}