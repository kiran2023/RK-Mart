import { product } from '../product'

import { Component, OnInit } from '@angular/core';
import { AdminProductsService } from '../services/admin-products.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  allProducts: product[] = [];
  totalProductAmount: number = 0;
  categoryCount: number = 0;
  editIcon = faEdit
  deleteIcon = faTrash;
  subscriptionData: Subscription[] |undefined = [];

  constructor(private productData: AdminProductsService, private title:Title) {

    this.subscriptionData?.push(this.productData.getProducts().subscribe(product => {
      this.allProducts = product as product[];
      this.subscriptionData?.push(this.productData.categoryTypesCount().subscribe( (category:any) => this.categoryCount = category.length));
    }));
    this.subscriptionData?.push(this.productData.productTotalAmount().subscribe((totalAmount: number) => {
      this.totalProductAmount = totalAmount;
    }));

  }
  ngOnInit(): void {
    this.title.setTitle('Products | RK MART');
  }

  removeProduct(id: number) {
    let result = confirm("Are you sure want to remove");
    if (result) {
      this.subscriptionData?.push(this.productData.deleteProduct(id).subscribe((data) => {
        alert("Product Removed Successfully");
        window.location.reload();
      }));
    }
  }

  ngOnDestroy(): void {
    this.subscriptionData?.forEach((subscribeData:Subscription)=> subscribeData.unsubscribe());
  }
}
