import {Component, Input} from '@angular/core';
import {SVGInterface} from "../shared/svg.interface";

@Component({
  selector: 'svg:svg[svgLine]',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements SVGInterface {

  @Input () data: any;

  constructor() { }

}
