import {Directive, ElementRef, HostBinding, HostListener, OnInit} from '@angular/core';
import {SvgService} from './svg.service';

@Directive({
  selector: '[svgSelect]'
})
export class SvgSelectDirective implements OnInit {

  @HostBinding('style.stroke')
  currentColor: string;

  currentMode: string;
  originalColor: string;
  selected = false;

  constructor(
    private _svgService: SvgService,
    private _element: ElementRef
  ) { }

  ngOnInit () {
    this._svgService.mode.subscribe((newMode) => this.currentMode = newMode);
    this.originalColor = this.currentColor;
  }

  @HostListener('mouseover')
  hoverStart() {
    if (this.currentMode === 'select') {
      this.currentColor = 'red';
    }
  }

  @HostListener('mouseleave')
  hoverEnd() {
    if (this.currentMode === 'select') {
      // Idea: make the highlighted color the inverse of the current color to avoid collisions
      if (!this.selected) {
        this.currentColor = this.originalColor;
      }
    }
  }

  @HostListener('click')
  selectClick() {
    if (this.currentMode !== 'select') {
      return;
    }
    this.selected = !this.selected;
    if (this.selected) {
      this.currentColor = 'red';
    } else {
      this.currentColor = this.originalColor;
    }
  }

  @HostListener('document:keydown', ['$event'])
  remove(evt) {
    if (this.currentMode !== 'select') {
      return;
    }
    if (!this.selected) {
      return;
    }
    if (evt.keyCode === 8 || evt.keyCode === 46) {
      evt.preventDefault();
      this._element.nativeElement.remove();
    }
  }
}
