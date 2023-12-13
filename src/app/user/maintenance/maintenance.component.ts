import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiUrl, Maintenance } from 'src/environments/environment';

@Component({
  selector: 'app-error',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  maintenanceImage = Maintenance.maintenanceImage;

  constructor(private title: Title, private router:Router) { }

  ngOnInit() {
    this.title.setTitle("Under Maintenance | RK MART");
    this.navigateMethod();
  }

  navigateMethod():boolean{
    if(!ApiUrl.maintenance){
      this.router.navigate(['home']);
      return false;
    }else{
      return true;
    }
  }

  closeOffer(){
    const $offerData:any = document.querySelector('.popupMsg');
    $offerData.close();
  }

}
