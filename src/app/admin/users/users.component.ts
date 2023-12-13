import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminProductsService } from '../services/admin-products.service';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  registeredUsers: any = "";
  subscriptionData: Subscription[] |undefined = [];

  constructor(private registeredUser: AdminProductsService, private title:Title) {
    this.subscriptionData?.push(this.registeredUser.getUsers().subscribe(user => this.registeredUsers = user));
  }

  ngOnInit(){
    this.title.setTitle('Users | RK MART');
  }

  removerUser(userId: any) {
    let result = confirm("Are you sure want to remove");
    if (result) {
      this.subscriptionData?.push(this.registeredUser.removerUser(userId).subscribe(() => {

        alert("User Removed Successfully");
      }));
    }

    this.subscriptionData?.push(this.registeredUser.getUsers().subscribe(user => this.registeredUsers = user));
  }
  ngOnDestroy(): void {
    
  }
}
