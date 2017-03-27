import {Directive, ElementRef, HostBinding, HostListener, OnInit} from '@angular/core';

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
    private element: ElementRef
  ) { }

  ngOnInit () {
    console.log("init");
    this.originalColor = this.element.nativeElement.style.stroke;
    if (this.transform) {
      let currentPos = this.transform.split('(')[1].split(')')[0].split(',');
      this.currentX = parseFloat(currentPos[0]);
      this.currentY = parseFloat(currentPos[1]);
    }
  }

  originalColor : string;
  selected : boolean = false;
  currentX : number = 0;
  currentY : number = 0;
  // TODO need to link this
  currentMode : string;
  offsetX;
  offsetY;

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
    let touchX = evt.pageX || evt.originalEvent.touches[0].pageX;
    let touchY = evt.pageY || evt.originalEvent.touches[0].pageY;

    // $document.bind('mousemove', {touchX: touchX, touchY: touchY}, dragMove);
    // $document.bind('mouseup', {touchX: touchX, touchY: touchY}, dragEnd);
    // $document.bind('touchmove', {touchX: touchX, touchY: touchY}, dragMove);
    // $document.bind('touchend', {touchX: touchX, touchY: touchY}, dragEnd);
    this.cursor = 'move';
  }

  @HostListener('mousemove', ['$event'])
  @HostListener('touchmove', ['$event'])
  dragMove(evt) {
    if (this.currentMode !== 'drag') {
      return;
    }
    if (!this.selected) {
      return;
    }
    evt.preventDefault();
    // TODO needs further investigation for passing data
    let startX = evt.data.touchX || evt.originalEvent.touches[0].touchX;
    let startY = evt.data.touchY || evt.originalEvent.touches[0].touchY;
    let pageX = evt.pageX || evt.originalEvent.touches[0].pageX;
    let pageY = evt.pageY || evt.originalEvent.touches[0].pageY;
    let deltaX = Number(((pageX - startX) * this.offsetX)) + this.dragX;
    let deltaY = Number(((pageY - startY) * this.offsetY)) + this.dragY;

    let newTransform = 'translate(' + deltaX + ', ' + deltaY + ')';

    this.transform = newTransform;
  }

  @HostListener('mousemove', ['$event'])
  @HostListener('touchmove', ['$event'])
  dragEnd(evt) {
    if (this.currentMode !== 'drag') {
      return;
    }

    this.selected = false;
    let startX = evt.data.touchX || evt.originalEvent.changedTouches[0].touchX;
    let startY = evt.data.touchY || evt.originalEvent.changedTouches[0].touchY;
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
