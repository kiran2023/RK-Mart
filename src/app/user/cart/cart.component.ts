import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthUserGuard } from 'src/app/auth-user.guard';
import { UrlGuard } from 'src/app/url.guard';
import { CartService } from 'src/app/user/services/cart.service';
import { ApiUrl, CartConstantData } from 'src/environments/environment';
import { NGXLogger } from 'ngx-logger';
import { LogService } from '../services/log.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterViewChecked, OnDestroy {

  product: any = [];
  subtotal: number = CartConstantData.cartTypescript.subtotal;
  productsUrl = ApiUrl.getProductDataUrl;
  cartEmptyImage = CartConstantData.cartComponent.cartEmptyImage;
  shippingCharges = CartConstantData.cartComponent.shippingCharges;
  productQuantityData = CartConstantData.cartTypescript.productQuantityData;
  offerApply: any;
  subscriptionData: Subscription[] |undefined = [];

  constructor(private cartService: CartService, private route: Router, private urlGuard: UrlGuard, private http: HttpClient, private guard: AuthUserGuard, private title: Title, private logger: NGXLogger, private logService:LogService) {
    this.urlGuard.navigatePermission = false;
  }

  ngOnInit() {
      this.offerApply = sessionStorage.getItem('offerApply');

      if (this.offerApply == 'true') {
        this.subscriptionData?.push(this.cartService.getProducts().subscribe((productData: any) => {
          this.product = productData;

          this.subtotal = this.cartService.getProductTotalAmount();

        }, (error:any) => {
          this.logService.fetchError(error);
        }));
      }

      if (this.offerApply == 'false') {
        this.subscriptionData?.push(this.cartService.getProducts().subscribe((productData: any) => {
          this.product = productData;

          this.subtotal = this.cartService.getProductTotalAmount();

        }, (error:any) => {
          this.logService.fetchError(error);
        }));
      }
      this.title.setTitle('Cart | RK MART');
  }

  quantityIncrement(id: any, productid: any) {
    this.subscriptionData?.push(this.http.get(`${this.productsUrl}/${productid}`).subscribe((productData: any) => {
      this.productQuantityData = this.cartService.increaseQuantity(id, productData.Stock);
    }));
  }

  quantityDecrement(id: any) {
    const indexValue = this.cartService.cartProducts.findIndex((cartData: any) => cartData.id == id);

    if (indexValue !== -1 && this.cartService.cartProducts[indexValue].quantity > 1) {
      this.productQuantityData = this.cartService.decreaseQuantity(id);
    }
  }

  removeProduct(product: any) {
    this.subscriptionData?.push(this.cartService.removeProduct(product, sessionStorage.getItem('userId')).subscribe());
  }

  shipping() {
    if (this.product.length != 0) {
      this.urlGuard.navigatePermission = true;
      this.route.navigate(['/cart/shipping']);
    }
  }

  clearCart() {
    this.product.forEach((product: any) => {
      this.cartService.clearCart(product.id);
    })
  }

  ngAfterViewChecked() {
    if (!sessionStorage.getItem('userLoggedIn')) {
      this.route.navigate(['home']);
    }
  }

  ngOnDestroy(): void {
    this.subscriptionData?.forEach((subscribeData:Subscription)=> subscribeData.unsubscribe());
  }
}