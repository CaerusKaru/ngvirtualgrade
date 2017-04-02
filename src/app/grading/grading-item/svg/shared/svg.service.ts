import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class SvgService {

  constructor() { }

  private _mode : BehaviorSubject<string> = new BehaviorSubject('draw');
  private _offsetX : BehaviorSubject<number> = new BehaviorSubject(1.0);
  private _offsetY : BehaviorSubject<number> = new BehaviorSubject(1.0);
  private _textEditing : BehaviorSubject<boolean> = new BehaviorSubject(false);

  public mode = this._mode.asObservable();
  public offsetX = this._offsetX.asObservable();
  public offsetY = this._offsetY.asObservable();
  public textEditing = this._textEditing.asObservable();

  setMode (newMode : string) {
    this._mode.next(newMode);
  }

  setOffsetX (offsetX : number) {
    this._offsetX.next(offsetX);
  }

  setOffsetY (offsetY : number) {
    this._offsetY.next(offsetY);
  }

  enableTextEditing () {
    this._textEditing.next(true);
  }

  disableTextEditing () {
    this._textEditing.next(false);
  }
}
