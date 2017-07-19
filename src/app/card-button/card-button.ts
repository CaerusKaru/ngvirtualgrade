import {
  Component, ViewEncapsulation, ElementRef, ChangeDetectionStrategy, Input
} from '@angular/core';

@Component({
  selector: 'card-button',
  templateUrl: './card-button.html',
  styleUrls: ['./card-button.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardButtonComponent {

  @Input() color: string;
  @Input() left: boolean;
  @Input() right: boolean;
  @Input() top: boolean;
  @Input() bottom: boolean;

  constructor(private _element: ElementRef) { }

  /** Retrieves the DOM element of the component host. */
  _getHostElement(): HTMLElement {
    return this._element.nativeElement;
  }
}
