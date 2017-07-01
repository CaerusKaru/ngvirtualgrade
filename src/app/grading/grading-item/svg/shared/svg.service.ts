import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class SvgService {

  mode: Observable<string>;
  offsetX: Observable<number>;
  offsetY: Observable<number>;
  textEditing: Observable<boolean>;

  private _mode: BehaviorSubject<string> = new BehaviorSubject('draw');
  private _offsetX: BehaviorSubject<number> = new BehaviorSubject(1.0);
  private _offsetY: BehaviorSubject<number> = new BehaviorSubject(1.0);
  private _textEditing: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    this.mode = this._mode.asObservable();
    this.offsetX = this._offsetX.asObservable();
    this.offsetY = this._offsetY.asObservable();
    this.textEditing = this._textEditing.asObservable();
  }

  setMode (newMode: string) {
    this._mode.next(newMode);
  }

  setOffsetX (offsetX: number) {
    this._offsetX.next(offsetX);
  }

  setOffsetY (offsetY: number) {
    this._offsetY.next(offsetY);
  }

  enableTextEditing () {
    this._textEditing.next(true);
  }

  disableTextEditing () {
    this._textEditing.next(false);
  }
}
