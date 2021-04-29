import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appTime]'
})
export class TimeDirective implements OnInit {

  constructor(private el: ElementRef) {
    setInterval(() => {
        this.showTime(el);
      },
      1000);
  }

  ngOnInit() {
    this.el.nativeElement.style.fontSize = '2em';
    this.el.nativeElement.style.marginTop = '0.2em';
    this.el.nativeElement.style.float = 'right';
  }

  private showTime(el: ElementRef) {
    let myDate = new Date();
    el.nativeElement.innerHTML = myDate.toLocaleTimeString('en-US');
  }

  @Input()
  set timeDirective(colour: string) {
    this.el.nativeElement.style.color = colour;
  }
}
