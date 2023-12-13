/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { OrderStatusDirective } from './order-status.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('Directive: OrderStatus', () => {
  it('should create an instance', () => {
    const elemenetRef:any = ElementRef;
    const renderer:any = Renderer2;
    const directive = new OrderStatusDirective(elemenetRef,renderer);
    expect(directive).toBeTruthy();
  });
});
