import {Directive, ElementRef, Input, HostListener, OnInit, Renderer, ViewChild} from '@angular/core';

@Directive({
  selector: '[svgWrapper]'
})
export class SvgWrapperDirective implements OnInit {

  constructor(
    private element: ElementRef,
    private renderer : Renderer
  ) { }

  ngOnInit () {
    // PDFService.initPDF().then(function () {
    //   currentPage = PDFService.getPage(0);
    //   attachPage(0, false);
    // }).catch (function () {
    //   $mdDialog.close();
    // });
    this.board = this.element.nativeElement.querySelector('svg');
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
  offsetX = 1.0;
  offsetY = 1.0;
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
      // $compile(angular.element(addEl))(scope);
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
    // angular.element(this.element[0].querySelector('svg')).append(textNode);
    // this.currentPage.addedStack.push(textNode);
    // $compile(angular.element(textNode))(scope);
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
    let path = document.createElementNS(this.ns, 'path');
    path.setAttributeNS(null, 'd', this.line);
    path.setAttributeNS(null, 'fill', 'none');
    path.setAttributeNS(null, 'stroke-linecap', 'round');
    path.setAttributeNS(null, 'stroke', color);
    path.setAttributeNS(null, 'stroke-width', size);
    path.setAttribute('svg-drag', '');
    path.setAttribute('svg-select', '');

    this.board.append(path);
    // this.currentPage.addedStack.push(path);
    // $compile(angular.element(path))(scope);

    this.gesture = false;
  }

  removeDots () {
    let dots = document.getElementsByClassName('dot');
    while (dots[0]) {
      dots[0].parentNode.removeChild(dots[0]);
    }
  }

  trace (evt) {
    let x = (evt.clientX - this.absPosX) ||
      (evt.originalEvent.touches[0].clientX - evt.originalEvent.touches[0].clientX - this.absPosX);
    let y = (evt.clientY - this.absPosY) ||
      (evt.originalEvent.touches[0].clientY - evt.originalEvent.touches[0].clientY - this.absPosY);

    let size = parseFloat(this.currentSize);
    let color = this.currentColor;
    let dot = document.createElement('div');
    dot.className = 'dot';
    dot.style.position = 'fixed';
    dot.style.top = (y - (size / (this.offsetY * 2))) + 'px';
    dot.style.left = (x - (size / (this.offsetX * 2))) + 'px';
    dot.style.background = color;
    dot.style.width = size / this.offsetX + 'px';
    dot.style.height = size / this.offsetY + 'px';
    dot.style.borderRadius = "100%";
    dot.style.display = "block";
    dot.style.opacity = "1.0";
    dot.style.pointerEvents = "none";
    document.getElementById('cursor').appendChild(dot);
  }

  attachPage (i, removeOld) {
    if (this.board) {
      this.currentPage.page = this.board;
      // angular.element(this.board).remove();
    }
    // this.currentPage = PDFService.changePage(this.currentPage, i, removeOld);
    // let svg = $compile(this.currentPage.page)(scope);
    // this.element.append(svg);
    this.board = document.getElementById('Layer_1');
    // fix for Safari SVG sizing issues
    if (this.board.hasAttribute('width')) {
      // angular.element(this.board).removeAttr('width');
    }
    if (this.board.hasAttribute('height')) {
      // angular.element(this.board).removeAttr('height');
    }
    // angular.element(this.board).addClass('md-whiteframe-20dp');
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
    this.offsetY = svgHeight / parseFloat(height);
    this.offsetX = svgWidth / parseFloat(width);
  }
}
