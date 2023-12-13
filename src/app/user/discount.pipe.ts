import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

  transform(Amount:any): any {
    return Math.abs(Amount*100).toFixed();
  }

}
