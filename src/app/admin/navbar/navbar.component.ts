import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminProductsService } from '../services/admin-products.service';
import { ApiUrl } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  logo = ApiUrl.adminLogo;
  constructor(private adminService:AdminProductsService, private route:Router){}

  logout(){
    this.adminService.admin = false;
    sessionStorage.clear();
    this.route.navigate(['home']);
  }
}
