import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class SvgService {

  constructor() { }

  public mode = new BehaviorSubject<string>('draw');
  public offsetX = new BehaviorSubject<number>(1.0);
  public offsetY = new BehaviorSubject<number>(1.0);
  public textEditing = new BehaviorSubject<boolean>(false);

  setMode (newMode : string) {
    this.mode.next(newMode);
  }

  setOffsetX (offsetX : number) {
    this.offsetX.next(offsetX);
  }

  setOffsetY (offsetY : number) {
    this.offsetY.next(offsetY);
  }

  enableTextEditing () {
    this.textEditing.next(true);
  }

  disableTextEditing () {
    this.textEditing.next(false);
  }

}
