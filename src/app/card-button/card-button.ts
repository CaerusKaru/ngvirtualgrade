import {
  Component, ViewEncapsulation, ElementRef, ChangeDetectionStrategy, Input
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';

@Component({
  selector: 'card-button',
  templateUrl: './card-button.html',
  styleUrls: ['./card-button.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardButtonComponent {

  @Input()
  get color() {
    return this._color;
  }
  set color(val) {
    this._color = val;
  }

  @Input()
  get left() {
    return this._left;
  }
  set left(val) {
    this._left = coerceBooleanProperty(val);
  }

  @Input()
  get right() {
    return this._right;
  }
  set right(val) {
    this._right = coerceBooleanProperty(val);
  }

  @Input()
  get top() {
    return this._top;
  }
  set top(val) {
    this._top = coerceBooleanProperty(val);
  }

  @Input()
  get bottom() {
    return this._bottom;
  }
  set bottom(val) {
    this._bottom = coerceBooleanProperty(val);
  }

  private _color: string;
  private _left: boolean;
  private _right: boolean;
  private _top: boolean;
  private _bottom: boolean;

  constructor(private _element: ElementRef) { }

  /** Retrieves the DOM element of the component host. */
  _getHostElement(): HTMLElement {
    return this._element.nativeElement;
  }
}
