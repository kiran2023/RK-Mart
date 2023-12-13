import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AdminComponent } from './admin.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { CategoryDataComponent } from './category-data/category-data.component';
import { QueriesComponent } from './queries/queries.component';
import { PaymentDataComponent } from './payment-data/payment-data.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    NavbarComponent,
    DashboardComponent,
    UsersComponent,
    ManageProductsComponent,
    ManageOrdersComponent,
    AdminComponent,
    AddProductsComponent,
    CategoryDataComponent,
    AddCategoryComponent,
    QueriesComponent,
    PaymentDataComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    DashboardComponent,
    UsersComponent,
    ManageProductsComponent,
    ManageOrdersComponent,
    AddProductsComponent,
    CategoryDataComponent
  ]
})
export class AdminModule { }
