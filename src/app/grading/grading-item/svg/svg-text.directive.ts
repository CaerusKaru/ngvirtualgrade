import {Directive, ElementRef, HostListener, OnInit, Renderer} from '@angular/core';

@Directive({
  selector: '[svgText]'
})
export class SvgTextDirective implements OnInit {

  constructor(
    private element: ElementRef,
    private renderer : Renderer
  ) { }

  ngOnInit () {
    this.currentColor = this.element.nativeElement.style.fill;
    this.fontColor = this.element.nativeElement.getAttribute('fill');
    this.fontSize = this.element.nativeElement.getAttribute('fontSize');
    this.fontFamily = this.element.nativeElement.getAttribute('fontFamily');

    if (this.element.nativeElement.getAttribute('init')) {
      this.createNode(null);
    }
  }

  currentMode : string;
  svgNS : string = 'http://www.w3.org/2000/svg';
  currentColor : string;
  lineHeight : number = 1.2;
  localEditing : boolean = false;
  // TODO manage this
  editingText : boolean = false;
  fontColor : string;
  fontSize : string;
  fontFamily : string;

  svgToHTML() {
    return this.element.nativeElement.innerHTML.split(/<\/tspan><tspan.*?">/)
      .join('<br>')
      .split(/<tspan.*?>/)
      .join('')
      .split('</tspan>')
      .join('');
  }

  getCurrentX() {
    let currentX = parseFloat(this.element.nativeElement.getAttribute('x'));
    let transform = this.element.nativeElement.getAttribute('transform');
    if (transform) {
      currentX += parseFloat(transform.split('(')[1].split(')')[0].split(',')[0]);
    }
    return currentX;
  }

  getCurrentY() {
    let currentY = parseFloat(this.element.nativeElement.getAttribute('y'));
    let transform = this.element.nativeElement.getAttribute('transform');
    if (transform) {
      currentY += parseFloat(transform.split('(')[1].split(')')[0].split(',')[1]);
    }
    return currentY;
  }

  removeBlanks(arrayElement) {
    if (arrayElement === '') {
      return ' ';
    }
    return arrayElement;
  }

  createTextDiv() {
    let textDiv = document.createElement('div');

    textDiv.style.fontSize = this.fontSize + 'px';
    textDiv.style.fontFamily = this.fontFamily;
    textDiv.style.fontWeight = 'bold';
    textDiv.innerHTML = this.svgToHTML();
    textDiv.setAttribute('contentEditable', 'true');
    textDiv.setAttribute('width', 'auto');
    textDiv.style.display = 'inline-block';
    textDiv.style.color = this.fontColor;
    textDiv.style.whiteSpace = 'pre';
    textDiv.classList.add('insideforeign');
    textDiv.style.lineHeight = this.lineHeight.toString();

    return textDiv;
  }

  createForeign() {
    let foreign = document.createElementNS(this.svgNS, 'foreignObject');
    let textDiv = this.createTextDiv();

    foreign.setAttribute('width', '100%');
    foreign.setAttribute('height', '100%');
    foreign.classList.add('foreign');
    // foreign.style.textAlign = 'left';
    // foreign.style.position = 'relative';
    foreign.setAttribute('x', this.getCurrentX() + 'px');
    foreign.setAttribute('y', this.getCurrentY() + 'px');
    foreign.appendChild(textDiv);

    return foreign;
  }

  createRange(evt, el) {
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

  shouldRemove(evt) {
    // if we're clicking on the only active div, no need to remove the node
    // else, remove the node because we clicked somewhere else
    // if it's on another text, it'll handle node creation
    if (!this.localEditing) {
      return false;
    }
    if (evt && evt.target) {
      let clickedOnThis = this.element.nativeElement.find(evt.target).length !== 0;
      let isForeign = evt.target.className === 'insideforeign';
      let isForeignAlt = evt.target.className === 'foreign';
      let isTspan = evt.target.nodeName.toLowerCase() === 'tspan';
      if (isForeign || isForeignAlt || (isTspan && clickedOnThis)) {
        return false;
      }
    }
    if (this.element.nativeElement.getAttribute('init')) {
      this.element.nativeElement.removeAttribute('init');
      return false;
    }
    return true;
  }

  getHTMLasSVG() {
    let curX = this.element.nativeElement.getAttribute('x');
    let innerDivText = this.element.nativeElement.querySelector('.insideforeign').innerHTML;
    let encodedString = encodeURI(innerDivText);
    let replaceText = '</tspan><tspan x="'+curX+'" dy="1.5em">';
    let filteredText = encodedString.split('%0A').map(this.removeBlanks).join(replaceText);
    let doubleFiltered = filteredText.split('%3Cbr%3E').map(this.removeBlanks).join(replaceText);
    let newString = '<tspan x="'+curX+'" dy="1.5em">' + doubleFiltered + '</tspan>';

    return decodeURI(newString);
  }

  @HostListener('click', ['$event'])
  cleanNode(evt) {
    if (this.currentMode !== 'text') {
      return;
    }
    // if we click on this element, don't remove
    if (!this.shouldRemove(evt)) {
      return;
    }

    // 1) update the <text> element with new text
    let textDiv = this.element.nativeElement.querySelector('.foreign');
    this.element.nativeElement.innerHTML = this.getHTMLasSVG();
    // 2) remove the HTML and reshow the <text> now with updated text
    textDiv.remove();
    this.element.nativeElement.show();
    // 3) clean up any loose ends, also remove this element if no longer
    //    contains text
    this.localEditing = false;
    // TODO manage this
    // element.bind('click', createNode);
    // $document.off('click', cleanNode);
    if (this.element.nativeElement.textContent === ' ') {
      this.element.nativeElement.remove();
    }
  }

  @HostListener('click', ['$event'])
  createNode(evt) {
    if (this.localEditing) {
      return;
    }
    this.editingText = true;
    this.localEditing = true;

    // 1) create the HTML editable text element
    let outerDiv = this.createForeign();

    // 2) append the element to the svg and hide the <text> element
    this.element.nativeElement.parentElement.append(outerDiv);
    this.element.nativeElement.hide();

    // 3) select the correct position in the div based on click position
    //    * should be 0,0 for init node
    let el = this.element.nativeElement.parentElement.querySelector(outerDiv);
    let range = this.createRange(evt, el);
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();

    // 4) if they click anywhere else on the document, clean up the node
    // TODO manage this
    // element.off('click', createNode);
    // $document.bind('click', cleanNode);
  }

}


//
// scope.$watch('mode', function (newMode, oldMode) {
//   if (oldMode === 'text' && localEditing) {
//     cleanNode();
//   }
//   cleanUp();
//   if (newMode === 'text') {
//     bindController();
//   }
//   element.css('fill', currentColor);
// });
