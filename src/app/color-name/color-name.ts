import {Directive, HostBinding, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[colorName]'
})
export class ColorNameDirective implements OnInit {

  @Input() colorName: string;
  @Input() borderRight: boolean;
  @Input() borderBottom: boolean;
  @Input() borderTop: boolean;
  @Input() borderLeft: boolean;

  @HostBinding('style.borderRightColor')
  get borderRightColor() {
    return this.borderRight ? this.color : '';
  }

  @HostBinding('style.borderBottomColor')
  get borderBottomColor() {
    return this.borderBottom ? this.color : '';
  }

  @HostBinding('style.borderTopColor')
  get borderTopColor() {
    return this.borderTop ? this.color : '';
  }

  @HostBinding('style.borderLeftColor')
  get borderLeftColor() {
    return this.borderLeft ? this.color : '';
  }

  color: string;

  constructor() {
  }

  ngOnInit() {
    this.color = '#' + this._intToRGB(this._hashCode(this.colorName)).toString();
  }

  private _hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  private _intToRGB(i) {
    /*tslint bitwise: false*/
    const c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();

    return '00000'.substring(0, 6 - c.length) + c;
  }
}
