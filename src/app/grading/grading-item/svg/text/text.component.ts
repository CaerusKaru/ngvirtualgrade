import {
  Component, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2, ViewChild, ViewContainerRef, OnDestroy
} from '@angular/core';
import {SVGInterface} from '../shared/svg.interface';
import {SvgService} from '../shared/svg.service';
import {Subject} from 'rxjs/Subject';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'svg:svg[svgText]',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements SVGInterface, OnInit, OnDestroy {

  @Input () data: any;

  @ViewChild('textdiv', {read: ViewContainerRef}) textdiv: ViewContainerRef;
  @ViewChild('textNode', {read: ViewContainerRef}) textNode: ViewContainerRef;

  @HostBinding('attr.init')
  init: boolean;

  currentMode: string;
  justCreated = false;
  lines: string[] = [];
  lineHeight = 1.2;
  textEditing: boolean;
  localEditing: boolean;
  transform: string;

  private _destroy = new Subject<void>();

  constructor(
    private _element: ElementRef,
    private _svgService: SvgService,
    private _renderer: Renderer2
  ) { }

  ngOnInit () {
    this._svgService.textEditing.pipe(takeUntil(this._destroy)).subscribe((val) => this.textEditing = val);
    this.localEditing = this.textEditing;
    this._svgService.mode.pipe(takeUntil(this._destroy)).subscribe((val) => {
      if (val !== 'text') {
        // find a better way of doing this
        if (this.localEditing) {
          this.cleanNode(null);
        }
        this._svgService.disableTextEditing();
        this.localEditing = false;
      }
      this.currentMode = val;
    });
    this.lines = this.data.lines.slice(0);
    this.init = this.data.init;
    if (this.init) {
      this.createNode(null);
      this.init = false;
    }
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  @HostListener('click', ['$event'])
  createNode (evt) {
    if (this.currentMode !== 'text') {
      return;
    }
    if (this.localEditing) {
      return;
    }

    const trans = () => {
      if (this.textNode) {
        this.transform = this.textNode.element.nativeElement.getAttribute('transform');
      } else {
        requestAnimationFrame(trans);
      }
    };

    trans();

    this._svgService.enableTextEditing();
    this.localEditing = true;

    const edit = () => {
      const range = this.createRange(evt, this.textdiv.element.nativeElement);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      this.textdiv.element.nativeElement.focus();
    };

    requestAnimationFrame(edit);
    this.justCreated = true;
  }

  @HostListener('document:click', ['$event'])
  cleanNode(evt) {

    if (this.justCreated) {
      this.justCreated = false;
      return;
    }

    if (this.currentMode !== 'text') {
      return;
    }

    if (!this.localEditing) {
      return;
    }

    if (evt && this._element.nativeElement.contains(evt.target)) {
      return;
    }

    if (evt && evt.target.nodeName !== 'text' && evt.target.nodeName !== 'tspan') {
      this._svgService.disableTextEditing();
    }

    this.localEditing = false;
    const newString = encodeURIComponent(this.textdiv.element.nativeElement.innerHTML);
    this.lines = newString.split('%0A').map(decodeURIComponent).join('<br>').split('<br>');

    if (this.textdiv.element.nativeElement.textContent === ' ') {
      this._element.nativeElement.remove();
    }

    const trans = () => {
      if (this.transform) {
        this._renderer.setAttribute(this.textNode.element.nativeElement, 'transform', this.transform);
      }
    };

    if (this.textNode) {
      trans();
    } else {
      requestAnimationFrame(trans);
    }
  }

  svgToHTML () {
    return this.lines.join('<br>');
  }

  get currentX () {
    let currentX = parseFloat(this.data.x);
    const transform = this._element.nativeElement.getAttribute('transform');
    if (this.transform) {
      currentX += parseFloat(this.transform.split('(')[1].split(')')[0].split(',')[0]);
    }
    return currentX;
  }

  get currentY () {
    let currentY = parseFloat(this.data.y);
    const transform = this._element.nativeElement.getAttribute('transform');
    if (this.transform) {
      currentY += parseFloat(this.transform.split('(')[1].split(')')[0].split(',')[1]);
    }
    return currentY;
  }

  get sizeString () {
    return (this.data.currentSize * 5).toString() + 'px';
  }

  createRange (evt, el) {
    let range;
    if (!evt) {
      range = document.createRange();
      range.setStart(el.childNodes[0], 0);
      range.collapse(true);
    } else {
      // courtesy of SO 12920225
      const x = evt.clientX;
      const y = evt.clientY;
      if (typeof document.createRange !== 'undefined') {
        // Try Mozilla's rangeOffset and rangeParent properties,
        // which are exactly what we want
        if (typeof evt.rangeParent !== 'undefined') {
          range = document.createRange();
          range.setStart(evt.rangeParent, evt.rangeOffset);
          range.collapse(true);
        } else if (document.caretRangeFromPoint) {
          // Next, the WebKit way
          range = document.caretRangeFromPoint(x, y);
        }
      }
    }

    return range;
  }
}
