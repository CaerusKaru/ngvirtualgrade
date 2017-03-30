import {
  ElementRef, Input, HostListener, Renderer, ViewChild, AfterViewInit,
  Component, OnInit, ComponentFactoryResolver, ViewContainerRef
} from '@angular/core';
import {LineComponent} from "../line/line.component";
import {SvgService} from "../shared/svg.service";

@Component({
  selector: 'svg-wrapper',
  templateUrl: './test.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit, AfterViewInit{

  constructor(
    private element: ElementRef,
    private renderer: Renderer,
    private svgService : SvgService,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) { }

  @ViewChild('board', {read: ViewContainerRef}) boardRef: ViewContainerRef;
  @ViewChild('container', {read: ViewContainerRef}) container : ViewContainerRef;
  @ViewChild('cursor') cursor : ElementRef;

  ngOnInit () {
    this.svgService.offsetX.subscribe((val) => this.offsetX = val);
    this.svgService.offsetY.subscribe((val) => this.offsetY = val);
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

  @Input () currentColor : string;
  @Input () currentSize : string;
  @Input () currentMode : string;

  ns = 'http://www.w3.org/2000/svg';
  xmlNS = 'http://www.w3.org/XML/1998/namespace';
  line = '';
  gesture = false;
  board;
  absPosX;
  absPosY;
  offsetX : number;
  offsetY : number;
  posX;
  posY;
  editingText = false;
  fontType = 'Helvetica';
  defaultText = '';
  currentPage = null;

  undo () {
    while (this.currentPage.addedStack.length !== 0) {
      let removeEl = this.currentPage.addedStack.pop();
      if (this.board.contains(removeEl)) {
        this.currentPage.undoStack.push(removeEl);
        this.board.removeChild(removeEl);
        break;
      }
    }
  }

  redo () {
    if (this.currentPage.undoStack.length !== 0) {
      let addEl = this.currentPage.undoStack.pop();
      this.currentPage.addedStack.push(addEl);
      this.board.append(addEl);
    }
  }

  clear () {
    let paths = this.board.children;
    let min = 1;

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
    if (this.currentMode === 'draw') {
      evt.preventDefault();
      this.drawStart(evt);
    }
  };

  // set the cursor styling here since in theory this should always happen first...
  @HostListener ('touchmove', ['$event'])
  @HostListener ('mousemove', ['$event'])
  clickMove (evt) {
    if (this.currentMode === 'draw') {
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
    if (this.currentMode === 'draw') {
      evt.preventDefault();
      this.drawEnd(evt);
    }
    return true;
  };

  getLocalMouse (evt) {
    let pt = this.board.createSVGPoint();
    pt.x = evt.clientX || evt.originalEvent.touches[0].clientX;
    pt.y = evt.clientY || evt.originalEvent.touches[0].clientY;
    return pt.matrixTransform(this.board.getScreenCTM().inverse());
  }

  textCreate (evt) {
    let altTargetName = evt.target.nodeName;
    let targetName = evt.target.className;
    if (targetName === 'insideforeign' || altTargetName.toLowerCase() === 'tspan') {
      return;
    }
    if (this.editingText) {
      this.editingText = false;
      return;
    }
    evt.preventDefault();
    let localpoint = this.getLocalMouse(evt);

    // let textNode = this.renderer.createElement(this.board.nativeElement, 'svg:text');
    // this.renderer.setElementAttribute(textNode, 'font-family', this.fontType);
    // this.renderer.setElementAttribute(textNode, 'font-size', parseFloat(this.currentSize) * 5 + '');
    // this.renderer.setElementAttribute(textNode, 'font-weight', 'bold');
    // this.renderer.setElementAttribute(textNode, 'fill', this.currentColor);
    // this.renderer.setElementAttribute(textNode, 'x', localpoint.x);
    // this.renderer.setElementAttribute(textNode, 'y', localpoint.y);
    // this.renderer.setElementAttribute(textNode, 'dy', '1.0em');
    // this.renderer.setElementAttribute(textNode, 'xml:space', 'preserve');
    //
    // let initSpan = this.renderer.createElement(textNode, 'svg:tspan');
    // this.renderer.setElementAttribute(initSpan, 'x', localpoint.x);
    // this.renderer.createText(initSpan, '');

    let textNode = document.createElementNS(this.ns, 'text');
    textNode.setAttributeNS(null, 'font-family', this.fontType);
    textNode.setAttributeNS(null, 'font-size', parseFloat(this.currentSize) * 5 + '');
    textNode.setAttributeNS(null, 'font-weight', 'bold');
    textNode.setAttributeNS(null, 'fill', this.currentColor);

    textNode.setAttributeNS(null, 'x', localpoint.x);
    textNode.setAttributeNS(null, 'y', localpoint.y);
    textNode.setAttributeNS(null, 'dy', '1.0em');
    textNode.setAttributeNS(this.xmlNS, 'xml:space', 'preserve');

    let initSpan = document.createElementNS(this.ns, 'tspan');
    initSpan.setAttributeNS(null, 'x', localpoint.x);

    let textSpan = document.createTextNode(this.defaultText);

    initSpan.appendChild(textSpan);
    textNode.appendChild(initSpan);

    textNode.setAttribute('svg-text', '');
    textNode.setAttribute('svg-select', '');
    textNode.setAttribute('svg-drag', '');
    textNode.setAttribute('init', 'true');

    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(LineComponent);
    let viewContainerRef = this.board.viewContainerRef;
    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<LineComponent>componentRef.instance).data = {
      text: textNode
    };

    // this.board.append(textNode);
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
    let color = this.currentColor;
    let size = this.currentSize;
    this.line += 'L' + ((evt.clientX || evt.originalEvent.changedTouches[0].clientX) - this.posX) * this.offsetX + ', ' +
      ((evt.clientY || evt.originalEvent.changedTouches[0].clientY) - this.posY) * this.offsetY;

    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(LineComponent);
    let viewContainerRef = this.container;
    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<LineComponent>componentRef.instance).data = {
      line: this.line,
      size: size,
      color: color
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
    let x = (evt.clientX - this.absPosX) ||
      (evt.originalEvent.touches[0].clientX - evt.originalEvent.touches[0].clientX - this.absPosX);
    let y = (evt.clientY - this.absPosY) ||
      (evt.originalEvent.touches[0].clientY - evt.originalEvent.touches[0].clientY - this.absPosY);

    let size = parseFloat(this.currentSize);
    let color = this.currentColor;

    let dot = this.renderer.createElement(this.cursor.nativeElement, 'div');
    this.renderer.setElementClass(dot, 'dot', true);
    this.renderer.setElementStyle(dot, 'position', 'fixed');
    this.renderer.setElementStyle(dot, 'top', (y - (size / (this.offsetY * 2))) + 'px');
    this.renderer.setElementStyle(dot, 'left', (x - (size / (this.offsetX * 2))) + 'px');
    this.renderer.setElementStyle(dot, 'background', color);
    this.renderer.setElementStyle(dot, 'width', size / this.offsetX + 'px');
    this.renderer.setElementStyle(dot, 'height', size / this.offsetY + 'px');
    this.renderer.setElementStyle(dot, 'borderRadius', '100%');
    this.renderer.setElementStyle(dot, 'display', 'block');
    this.renderer.setElementStyle(dot, 'opacity', '1.0');
    this.renderer.setElementStyle(dot, 'pointerEvents', 'none');
    this.renderer.projectNodes(this.cursor.nativeElement, [dot]);
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

  removePage () {
    // INVARIANT: first page attached is not removable, so we can safely assume selectedPage > 0
    // this.attachPage(PDFService.currentPage() - 1, true);
  }

  addPage () {
    // PDFService.addPage(PDFService.currentPage() + 1);
    // this.attachPage(PDFService.currentPage() + 1, false);
  }

  backPage () {
    // this.attachPage(PDFService.currentPage() - 1, false);
  }

  nextPage () {
    // this.attachPage(PDFService.currentPage() + 1, false);
  }

  // $on('addPage', addPage);
  // $on('removePage', removePage);
  // $on('backPage', backPage);
  // $on('nextPage', nextPage);

  updateBoundingRect () {
    let bRect = this.element.nativeElement.getBoundingClientRect();
    this.absPosX = bRect.left;
    this.absPosY = bRect.top;

    if (!this.board) {
      return;
    }
    let boundingClientRect = this.board.getBoundingClientRect();
    this.posX = boundingClientRect.left;
    this.posY = boundingClientRect.top;
    let viewBox = this.board.getAttribute('viewBox');
    let height = boundingClientRect.height;
    let width = boundingClientRect.width;
    let svgHeight = parseFloat(viewBox.split(' ')[3]);
    let svgWidth = parseFloat(viewBox.split(' ')[2]);
    this.svgService.setOffsetX(svgWidth / parseFloat(width));
    this.svgService.setOffsetY(svgHeight / parseFloat(height));
  }
}
