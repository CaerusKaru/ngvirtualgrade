import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {NgServiceWorker} from '@angular/service-worker';
import {concat} from 'rxjs/operator/concat';
import {Observable} from 'rxjs/Observable';
import {takeUntil} from 'rxjs/operator/takeUntil';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {startWith} from 'rxjs/operator/startWith';

/**
 * credit to Angular Core team and their work on angular.io
 */
@Injectable()
export class SwUpdatesService implements OnDestroy {

  updateActivated;

  private _destroy = new Subject();
  private _checkInterval = 1000 * 60 * 60 * 6;   // 6 hours
  private _checkForUpdateSubj = new Subject();

  constructor(private _sw: NgServiceWorker) {

    takeUntil.call(
      debounceTime.call(
        startWith.call(this._checkForUpdateSubj, null),
        this._checkInterval),
      this._destroy)
      .subscribe(() => this._checkForUpdate());

    this.updateActivated = takeUntil.call(this._sw.updates, this._destroy)
      .filter(({type}) => type === 'activation')
      .map(({version}) => version);
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  private _checkForUpdate() {
    // Temp workaround for https://github.com/angular/mobile-toolkit/pull/137.
    // TODO (): Remove once #137 is fixed.
    concat.call(this._sw.checkForUpdate(), Observable.of(false))
      .take(1)
      .subscribe(v => v ? this._activateUpdate() : this._scheduleCheckForUpdate());
  }

  private _activateUpdate() {
    this._sw.activateUpdate(null)
      .subscribe(() => this._scheduleCheckForUpdate());
  }

  private _scheduleCheckForUpdate() {
    this._checkForUpdateSubj.next();
  }
}
