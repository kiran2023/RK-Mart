import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsDataService } from 'src/app/user/services/products-data.service';
import { CategoryFiltrationService } from '../services/category-filtration.service';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
  category: string | null = "";
  currentCategory: string | null | undefined;

  categoryTypes: any = [];
  categoryDisplay: any = "";

  offerApply: any;
  subscriptionData: Subscription|undefined;

  constructor(private route: ActivatedRoute, private productService: ProductsDataService, private renderer:Renderer2 , private filterService: CategoryFiltrationService, private logger: NGXLogger) {
    this.offerApply = sessionStorage.getItem('offerApply');
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('category')) {
      this.category = this.route.snapshot.paramMap.get('category');
      this.currentCategory = this.route.snapshot.paramMap.get('category');
    }

    this.subscriptionData = this.productService.getCategory().subscribe((data) => {
      this.categoryDisplay = data;

      this.categoryDisplay.forEach((categoryType: any) => {
        this.categoryTypes.push(categoryType.categoryType);
      })
    });
  }

  categorySelected(id: any, checkedData: any) {    
    const checkedStatus = (checkedData.target as HTMLInputElement)?.checked
    if (checkedStatus) {      
      this.filterService.addSelectedCategory(id);
    } else if (checkedData == '') {  
      const checkboxElement = document.querySelector(`.p-btn--${id}`) as HTMLInputElement;
      if (checkboxElement) {
        const dataBtnNum = checkboxElement.getAttribute('data-btn-num');
        if (dataBtnNum) {
          checkboxElement.checked = true;
          this.filterService.addSelectedCategory(id);
        }else{
          checkboxElement.checked = false;
        }
      }
    } else {
      this.filterService.removeSelectedCategory(id);
      checkedData.target.checked = false;
    }
  }

  discountData(data: any) {
    const id = data.target.value;
    const checkedStatus = (data.target as HTMLInputElement)?.checked;
    if (checkedStatus) {
      this.filterService.addDiscountCategory(id);
    } else {
      this.filterService.removeDiscountCategory(id);
    }
  }

  reviewData(reviewRating: any) {
    const rating = reviewRating.target.value;

    const checkedStatus = (reviewRating.target as HTMLInputElement)?.checked;
    if (checkedStatus) {
      this.filterService.addReviewCategory(rating);
    } else {
      this.filterService.removeReviewCategory(rating);
    }
  }

  toggleCategory() {
    let menu = document.querySelector('.bevergeSection');
    menu?.classList.toggle('menuActive');
  }

  ngOnDestroy(): void {
    this.subscriptionData?.unsubscribe();
  }
}
