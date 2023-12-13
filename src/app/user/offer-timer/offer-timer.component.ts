import { Component, OnInit } from '@angular/core';
import { ProductsDataService } from '../services/products-data.service';

@Component({
  selector: 'app-offer-timer',
  templateUrl: './offer-timer.component.html',
  styleUrls: ['./offer-timer.component.css']
})
export class OfferTimerComponent implements OnInit {
  remainingTime:any;
  constructor( private productDataService:ProductsDataService ) {}

  ngOnInit() {
    this.remainingTime = this.productDataService.remainingTime;
  }
}