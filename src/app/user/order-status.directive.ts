import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appOrderStatus]'
})
export class OrderStatusDirective implements OnInit {
  @Input('appOrderStatus') orderStatue:any; 

  constructor( private elementData:ElementRef, private renderer:Renderer2 ) { }

  ngOnInit(): void {
    this.checkOrderStatus();
  }

  checkOrderStatus(){
    if(this.orderStatue=='Processing'){
      this.renderer.addClass( this.elementData.nativeElement,'myOrdersProcessing' );
    }
    if(this.orderStatue=='Packed'){
      this.renderer.addClass( this.elementData.nativeElement,'myOrderPacked' );
    }
    if(this.orderStatue=='Delivered'){
      this.renderer.addClass( this.elementData.nativeElement,'myOrderDelivered' );
    }
    if(this.orderStatue=='Cancelled'){
      this.renderer.addClass( this.elementData.nativeElement,'myOrderCancelled' );
    }
  }

}
