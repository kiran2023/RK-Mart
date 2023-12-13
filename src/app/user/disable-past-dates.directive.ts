import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDisablePastDates]'
})
export class DisablePastDatesDirective {

  constructor(private element: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    const today = new Date().toISOString().slice(0, 10);
    if (value < today) {
      this.element.nativeElement.value = today; 
    }
  }

  ngOnInit() {}

}
