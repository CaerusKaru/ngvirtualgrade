import {AfterViewInit, Component, ElementRef, Input} from '@angular/core';
import {SVGInterface} from "../shared/svg.interface";

@Component({
  selector: '[svgText]',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements SVGInterface, AfterViewInit {

  @Input () data : any;

  constructor(
    private element : ElementRef
  ) { }

  ngAfterViewInit() {
    this.element.nativeElement.append(this.data.text);
  }

}
