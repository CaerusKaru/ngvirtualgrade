import {Directive, ElementRef, HostBinding, HostListener, OnInit, OnDestroy} from '@angular/core';
import {SvgService} from './svg.service';
import {Subject} from 'rxjs/Subject';
import {takeUntil} from 'rxjs/operator/takeUntil';

@Directive({
  selector: '[svgDrag]'
})
export class SvgDragDirective implements OnInit, OnDestroy {

  @HostBinding('style.stroke')
  currentColor: string;

  @HostBinding('attr.transform')
  transform: string;

  @HostBinding('style.cursor')
  cursor: string;

  @HostBinding('attr.dragX')
  dragX: number;

  @HostBinding('attr.dragY')
  dragY: number;

  currentMode: string;
  originalColor: string;
  selected = false;
  currentX = 0;
  currentY = 0;
  offsetX: number;
  offsetY: number;
  touchX;
  touchY;

  private _destroy = new Subject<void>();

  constructor(
    private _element: ElementRef,
    private _svgService: SvgService
  ) { }

  ngOnInit () {
    takeUntil.call(this._svgService.mode, this._destroy).subscribe((newMode) => this.currentMode = newMode);
    takeUntil.call(this._svgService.offsetX, this._destroy).subscribe((val) => this.offsetX = val);
    takeUntil.call(this._svgService.offsetY, this._destroy).subscribe((val) => this.offsetY = val);
    this.originalColor = this._element.nativeElement.style.stroke;
    if (this.transform) {
      const currentPos = this.transform.split('(')[1].split(')')[0].split(',');
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

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

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
    const startX = this.touchX || evt.originalEvent.touches[0].touchX;
    const startY = this.touchY || evt.originalEvent.touches[0].touchY;
    const pageX = evt.pageX || evt.originalEvent.touches[0].pageX;
    const pageY = evt.pageY || evt.originalEvent.touches[0].pageY;
    const deltaX = Number(((pageX - startX) * this.offsetX)) + this.dragX;
    const deltaY = Number(((pageY - startY) * this.offsetY)) + this.dragY;

    this.transform = 'translate(' + deltaX + ', ' + deltaY + ')';
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
    const startX = this.touchX || evt.originalEvent.changedTouches[0].touchX;
    const startY = this.touchY || evt.originalEvent.changedTouches[0].touchY;
    const pageX = evt.pageX || evt.originalEvent.changedTouches[0].pageX;
    const pageY = evt.pageY || evt.originalEvent.changedTouches[0].pageY;
    const deltaX = Number(((pageX - startX) * this.offsetX)) + this.dragX;
    const deltaY = Number(((pageY - startY) * this.offsetY)) + this.dragY;

    this.currentX = deltaX + this._element.nativeElement.getAttribute('x');
    this.currentY = deltaY + this._element.nativeElement.getAttribute('y');

    this.dragX = deltaX;
    this.dragY = deltaY;
    this.cursor = 'auto';
  }
}
