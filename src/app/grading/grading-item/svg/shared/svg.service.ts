import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class SvgService {

  constructor() {
    this.mode = this._mode.asObservable();
    this.offsetX = this._offsetX.asObservable();
    this.offsetY = this._offsetY.asObservable();
    this.textEditing = this._textEditing.asObservable();
  }

  public mode : Observable<string>;
  public offsetX : Observable<number>;
  public offsetY : Observable<number>;
  public textEditing : Observable<boolean>;

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

  private _mode : BehaviorSubject<string> = new BehaviorSubject('draw');
  private _offsetX : BehaviorSubject<number> = new BehaviorSubject(1.0);
  private _offsetY : BehaviorSubject<number> = new BehaviorSubject(1.0);
  private _textEditing : BehaviorSubject<boolean> = new BehaviorSubject(false);
}
