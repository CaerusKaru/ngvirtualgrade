import {
  Component, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer, ViewChild, ViewContainerRef
} from '@angular/core';
import {SVGInterface} from "../shared/svg.interface";
import {SvgService} from "../shared/svg.service";

@Component({
  selector: 'svg:svg[svgText]',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements SVGInterface, OnInit {

  @Input () data : any;

  @ViewChild('textdiv', {read: ViewContainerRef}) textdiv : ViewContainerRef;
  @ViewChild('textNode', {read: ViewContainerRef}) textNode : ViewContainerRef;

  @HostBinding('attr.init')
  init : boolean;

  constructor(
    private element : ElementRef,
    private svgService : SvgService,
    private renderer : Renderer
  ) { }

  ngOnInit () {
    this.svgService.textEditing.subscribe((val) => this.textEditing = val);
    this.localEditing = this.textEditing;
    this.svgService.mode.subscribe((val) => {
      if (val !== 'text') {
        // find a better way of doing this
        if (this.localEditing) {
          this.cleanNode(null);
        }
        this.svgService.disableTextEditing();
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

  currentMode : string;
  justCreated : boolean = false;
  lines: string[] = [];
  lineHeight : number = 1.2;
  textEditing : boolean;
  localEditing : boolean;
  transform : string;

  @HostListener('click', ['$event'])
  createNode (evt) {
    if (this.currentMode !== 'text') {
      return;
    }
    if (this.localEditing) {
      return;
    }

    let trans = () => {
      if (this.textNode) {
        this.transform = this.textNode.element.nativeElement.getAttribute('transform');
      } else {
        requestAnimationFrame(trans);
      }
    };

    trans();

    this.svgService.enableTextEditing();
    this.localEditing = true;

    let edit = () => {
      let range = this.createRange(evt, this.textdiv.element.nativeElement);
      let sel = window.getSelection();
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

    if (evt && this.element.nativeElement.contains(evt.target)) {
      return;
    }

    if (evt && evt.target.nodeName !== 'text' && evt.target.nodeName !== 'tspan') {
      this.svgService.disableTextEditing();
    }

    this.localEditing = false;
    let newString = encodeURIComponent(this.textdiv.element.nativeElement.innerHTML);
    this.lines = newString.split('%0A').map(decodeURIComponent).join('<br>').split('<br>');

    if (this.textdiv.element.nativeElement.textContent === ' ') {
      this.element.nativeElement.remove();
    }

    let trans = () => {
      this.renderer.setElementAttribute(this.textNode.element.nativeElement, 'transform', this.transform);
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
    let transform = this.element.nativeElement.getAttribute('transform');
    if (this.transform) {
      currentX += parseFloat(this.transform.split('(')[1].split(')')[0].split(',')[0]);
    }
    return currentX;
  }

  get currentY () {
    let currentY = parseFloat(this.data.y);
    let transform = this.element.nativeElement.getAttribute('transform');
    if (this.transform) {
      currentY += parseFloat(this.transform.split('(')[1].split(')')[0].split(',')[1]);
    }
    return currentY;
  }

  get sizeString () {
    return (this.data.currentSize * 5).toString() + "px";
  }

  createRange (evt, el) {
    let range;
    if (!evt) {
      range = document.createRange();
      range.setStart(el.childNodes[0], 0);
      range.collapse(true);
    } else {
      // courtesy of SO 12920225
      let x = evt.clientX, y = evt.clientY;
      if (typeof document.createRange !== 'undefined') {
        // Try Mozilla's rangeOffset and rangeParent properties,
        // which are exactly what we want
        if (typeof evt.rangeParent !== 'undefined') {
          range = document.createRange();
          range.setStart(evt.rangeParent, evt.rangeOffset);
          range.collapse(true);
        }

        // Next, the WebKit way
        else if (document.caretRangeFromPoint) {
          range = document.caretRangeFromPoint(x, y);
        }
      }
    }

    return range;
  }
}
