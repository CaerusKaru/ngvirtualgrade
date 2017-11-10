import {
  ElementRef, Input, HostListener, ViewChild, AfterViewInit,
  Component, OnInit, ComponentFactoryResolver, ViewContainerRef, Renderer2, OnDestroy
} from '@angular/core';
import {LineComponent} from '../line/line.component';
import {SvgService} from '../shared/svg.service';
import {TextComponent} from '../text/text.component';
import {takeUntil} from 'rxjs/operators/takeUntil';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'svg-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('board', {read: ViewContainerRef}) boardRef: ViewContainerRef;
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  @ViewChild('cursor') cursor: ElementRef;

  @Input () currentColor: string;
  @Input () currentSize: string;
  @Input () currentMode: string;

  line = '';
  gesture = false;
  board;
  absPosX;
  absPosY;
  offsetX: number;
  offsetY: number;
  posX;
  posY;
  textEditing: boolean;
  defaultText = '';
  currentPage = null;

  private _destroy = new Subject<void>();

  constructor(
    private _element: ElementRef,
    private _renderer: Renderer2,
    private _svgService: SvgService,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit () {
    this._svgService.offsetX.pipe(takeUntil(this._destroy)).subscribe((val) => this.offsetX = val);
    this._svgService.offsetY.pipe(takeUntil(this._destroy)).subscribe((val) => this.offsetY = val);
    this._svgService.textEditing.pipe(takeUntil(this._destroy)).subscribe((val) => this.textEditing = val);
    // TODO fetch the pdf annotations while the view is rendering
    // PDFService.initPDF().then(function () {
    //   currentPage = PDFService.getPage(0);
    //   attachPage(0, false);
    // }).catch (function () {
    //   $mdDialog.close();
    // });
  }

  ngAfterViewInit () {
    this.board = this.boardRef.element.nativeElement;
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  undo () {
    while (this.currentPage.addedStack.length !== 0) {
      const removeEl = this.currentPage.addedStack.pop();
      if (this.board.contains(removeEl)) {
        this.currentPage.undoStack.push(removeEl);
        this.board.removeChild(removeEl);
        break;
      }
    }
  }

  redo () {
    if (this.currentPage.undoStack.length !== 0) {
      const addEl = this.currentPage.undoStack.pop();
      this.currentPage.addedStack.push(addEl);
      this.board.append(addEl);
    }
  }

  clear () {
    const paths = this.board.children;
    const min = 1;

    if (paths.length > min) {
      while (paths[min]) {
        this.board.removeChild(paths[min]);
      }
    }
  }

  // $on('clear', clear);
  // $on('undo', undo);
  // $on('redo', redo);

  @HostListener ('mousedown', ['$event'])
  @HostListener ('touchstart', ['$event'])
  clickDown (evt) {
    this.updateBoundingRect();
    if (this.currentMode === 'draw' || this.currentMode === 'highlight') {
      evt.preventDefault();
      this.drawStart(evt);
    }
  };

  // set the cursor styling here since in theory this should always happen first...
  @HostListener ('touchmove', ['$event'])
  @HostListener ('mousemove', ['$event'])
  clickMove (evt) {
    if (this.currentMode === 'draw' || this.currentMode === 'highlight') {
      evt.preventDefault();
      this.drawMove(evt);
    } else {
      if (this.board) {
        this.board.style.cursor = 'auto';
      }
    }
  };

  // must be document, because mouseup technically happens on the div.dot
  @HostListener ('document:mouseup', ['$event'])
  @HostListener ('document:touchend', ['$event'])
  clickUp (evt) {
    if (this.currentMode === 'draw' || this.currentMode === 'highlight') {
      evt.preventDefault();
      this.drawEnd(evt);
    }
    return true;
  };

  getLocalMouse (evt) {
    const pt = this.board.createSVGPoint();
    pt.x = evt.clientX || evt.originalEvent.touches[0].clientX;
    pt.y = evt.clientY || evt.originalEvent.touches[0].clientY;
    return pt.matrixTransform(this.board.getScreenCTM().inverse());
  }

  textCreate (evt) {
    // let altTargetName = evt.target.nodeName;
    // let targetName = evt.target.className;
    if (this.textEditing) {
      return;
    }
    evt.preventDefault();
    const localpoint = this.getLocalMouse(evt);

    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(TextComponent);
    const viewContainerRef = this.container;
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<TextComponent>componentRef.instance).data = {
      init: true,
      currentColor: this.currentColor,
      currentSize: this.currentSize,
      lines: [' '],
      x: localpoint.x,
      y: localpoint.y - (parseFloat(this.currentSize) * 2)
    };
    // this.currentPage.addedStack.push(textNode);
  }

  @HostListener ('click', ['$event'])
  @HostListener ('touchstart', ['$event'])
  click (evt) {
    if (this.currentMode === 'text') {
      this.textCreate(evt);
    }
  }

  drawStart (evt) {
    this.line = 'M' + ((evt.clientX || evt.originalEvent.touches[0].clientX) - this.posX) * this.offsetX + ', ' +
      ((evt.clientY || evt.originalEvent.touches[0].clientY) - this.posY) * this.offsetY + ' ';
    this.gesture = true;
    evt.preventDefault();
  }

  drawMove(evt) {
    if (this.gesture) {
      this.line += 'L' + ((evt.clientX || evt.originalEvent.touches[0].clientX) - this.posX) * this.offsetX + ', ' +
        ((evt.clientY || evt.originalEvent.touches[0].clientY) - this.posY) * this.offsetY + ' ';
      this.trace(evt);
    }
  }

  drawEnd (evt) {
    if (!this.gesture) {
      return;
    }
    this.removeDots();
    const color = this.currentColor;
    const size = this.currentSize;
    this.line += 'L' + ((evt.clientX || evt.originalEvent.changedTouches[0].clientX) - this.posX) * this.offsetX + ', ' +
      ((evt.clientY || evt.originalEvent.changedTouches[0].clientY) - this.posY) * this.offsetY;

    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(LineComponent);
    const viewContainerRef = this.container;
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<LineComponent>componentRef.instance).data = {
      line: this.line,
      size: size,
      color: color,
      opacity: this.currentMode === 'highlight' ? 0.6 : 1.0
    };

    // this.currentPage.addedStack.push(path);

    this.gesture = false;
  }

  removeDots () {
    while (this.cursor.nativeElement.firstChild) {
      this.cursor.nativeElement.removeChild(this.cursor.nativeElement.firstChild);
    }
  }

  trace (evt) {
    const x = (evt.clientX - this.absPosX) ||
      (evt.originalEvent.touches[0].clientX - evt.originalEvent.touches[0].clientX - this.absPosX);
    const y = (evt.clientY - this.absPosY) ||
      (evt.originalEvent.touches[0].clientY - evt.originalEvent.touches[0].clientY - this.absPosY);

    const size = parseFloat(this.currentSize);
    const color = this.currentColor;

    const dot = this._renderer.createElement('div');
    this._renderer.addClass(dot, 'dot');
    this._renderer.setStyle(dot, 'position', 'fixed');
    this._renderer.setStyle(dot, 'top', (y - (size / (this.offsetY * 2))).toString() + 'px');
    this._renderer.setStyle(dot, 'left', (x - (size / (this.offsetX * 2))).toString() + 'px');
    this._renderer.setStyle(dot, 'background', color);
    this._renderer.setStyle(dot, 'width', (size / this.offsetX).toString() + 'px');
    this._renderer.setStyle(dot, 'height', (size / this.offsetY).toString() + 'px');
    this._renderer.setStyle(dot, 'borderRadius', '100%');
    this._renderer.setStyle(dot, 'display', 'block');
    this._renderer.setStyle(dot, 'opacity', this.currentMode === 'highlight' ? '0.3' : '1.0');
    this._renderer.setStyle(dot, 'pointerEvents', 'none');
    this._renderer.appendChild(this.cursor.nativeElement, dot);
  }

  attachPage (i, removeOld) {
    if (this.board) {
      this.currentPage.page = this.board;
      // TODO maybe not do this
      this.board.remove();
    }
    // this.currentPage = PDFService.changePage(this.currentPage, i, removeOld);
    // this.element.append(svg);
  }

  backPage () {
    // this.attachPage(PDFService.currentPage() - 1, false);
  }

  nextPage () {
    // this.attachPage(PDFService.currentPage() + 1, false);
  }

  // $on('backPage', backPage);
  // $on('nextPage', nextPage);

  updateBoundingRect () {
    const bRect = this._element.nativeElement.getBoundingClientRect();
    this.absPosX = bRect.left;
    this.absPosY = bRect.top;

    if (!this.board) {
      return;
    }
    const boundingClientRect = this.board.getBoundingClientRect();
    this.posX = boundingClientRect.left;
    this.posY = boundingClientRect.top;
    const viewBox = this.board.getAttribute('viewBox');
    const height = boundingClientRect.height;
    const width = boundingClientRect.width;
    const svgHeight = parseFloat(viewBox.split(' ')[3]);
    const svgWidth = parseFloat(viewBox.split(' ')[2]);
    this._svgService.setOffsetX(svgWidth / parseFloat(width));
    this._svgService.setOffsetY(svgHeight / parseFloat(height));
  }
}
