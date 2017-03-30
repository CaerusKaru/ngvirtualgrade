import {Directive, ElementRef, HostBinding, HostListener, OnInit} from '@angular/core';
import {SvgService} from "./shared/svg.service";

@Directive({
  selector: '[svgDrag]'
})
export class SvgDragDirective implements OnInit {

  @HostBinding('style.stroke')
  currentColor : string;

  @HostBinding('attr.transform')
  transform : string;

  @HostBinding('style.cursor')
  cursor : string;

  @HostBinding('attr.dragX')
  dragX : number;

  @HostBinding('attr.dragY')
  dragY : number;

  constructor(
    private element: ElementRef,
    private svgService : SvgService
  ) { }

  ngOnInit () {
    this.svgService.mode.subscribe((newMode) => this.currentMode = newMode);
    this.svgService.offsetX.subscribe((val) => this.offsetX = val);
    this.svgService.offsetY.subscribe((val) => this.offsetY = val);
    this.originalColor = this.element.nativeElement.style.stroke;
    if (this.transform) {
      let currentPos = this.transform.split('(')[1].split(')')[0].split(',');
      this.currentX = parseFloat(currentPos[0]);
      this.currentY = parseFloat(currentPos[1]);
    }
    if (!this.dragX) {
      this.dragX = 0.0;
    }
    if (!this.dragY) {
      this.dragY = 0.0;
    }
  }

  currentMode : string;
  originalColor : string;
  selected : boolean = false;
  currentX : number = 0;
  currentY : number = 0;
  offsetX : number;
  offsetY : number;
  touchX;
  touchY;

  @HostListener ('mouseover')
  hoverStart() {
    if (this.currentMode === 'drag') {
      this.currentColor = 'red';
    }
  }

  @HostListener('mouseleave')
  hoverEnd() {
    if (this.currentMode === 'drag') {
      // Idea: make the highlighted color the inverse of the current color to avoid collisions
      if (!this.selected) {
        this.currentColor = this.originalColor;
      }
    }
  }

  @HostListener('mousedown', ['$event'])
  @HostListener('touchdown', ['$event'])
  dragStart(evt) {
    if (this.currentMode !== 'drag') {
      return;
    }
    evt.preventDefault();
    this.selected = true;
    this.touchX = evt.pageX || evt.originalEvent.touches[0].pageX;
    this.touchY = evt.pageY || evt.originalEvent.touches[0].pageY;
    this.cursor = 'move';
  }

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:touchmove', ['$event'])
  dragMove(evt) {
    if (this.currentMode !== 'drag') {
      return;
    }
    if (!this.selected) {
      return;
    }
    evt.preventDefault();
    // TODO needs further investigation for passing data
    let startX = this.touchX || evt.originalEvent.touches[0].touchX;
    let startY = this.touchY || evt.originalEvent.touches[0].touchY;
    let pageX = evt.pageX || evt.originalEvent.touches[0].pageX;
    let pageY = evt.pageY || evt.originalEvent.touches[0].pageY;
    let deltaX = Number(((pageX - startX) * this.offsetX)) + this.dragX;
    let deltaY = Number(((pageY - startY) * this.offsetY)) + this.dragY;

    this.transform = 'translate(' + deltaX + ', '+ deltaY + ')';
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('touchend', ['$event'])
  dragEnd(evt) {
    if (this.currentMode !== 'drag') {
      return;
    }
    if (!this.selected) {
      return;
    }

    this.selected = false;
    let startX = this.touchX || evt.originalEvent.changedTouches[0].touchX;
    let startY = this.touchY || evt.originalEvent.changedTouches[0].touchY;
    let pageX = evt.pageX || evt.originalEvent.changedTouches[0].pageX;
    let pageY = evt.pageY || evt.originalEvent.changedTouches[0].pageY;
    let deltaX = Number(((pageX - startX) * this.offsetX)) + this.dragX;
    let deltaY = Number(((pageY - startY) * this.offsetY)) + this.dragY;

    this.currentX = deltaX + this.element.nativeElement.getAttribute('x');
    this.currentY = deltaY + this.element.nativeElement.getAttribute('y');

    this.dragX = deltaX;
    this.dragY = deltaY;
    this.cursor = 'auto';
  }
}
