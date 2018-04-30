import { Directive, Input, ElementRef, OnInit } from '@angular/core';
@Directive({
  selector: '[myIonicInput]', // Attribute selector
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
    // '(keypress)': 'onKeyPress'
  }
})
export class MyIonicInputDirective {
  @Input('myIonicInput') myStyles: any;
  constructor(private el: ElementRef) {
    el.nativeElement.onkeypress = function(e) {
      console.log(e);
      if ('~!@#$%^&*()-='.includes(String.fromCharCode(e.keyCode))) {
        e.preventDefault();
        return;
      }
    }
  }

  ngOnInit() {
    console.log(this.myStyles);
  }

  onMouseEnter() {
    this.myStyles.showUsername = true;
  }
  onMouseLeave(e) {
    this.myStyles.showUsername = false;
  }

  // onKeyPress will not work with ion-input directly
  // because the actual input element is a child of ion-input
  // onKeyPress() {
  // console.log("onKeyPress");
  // }
}
