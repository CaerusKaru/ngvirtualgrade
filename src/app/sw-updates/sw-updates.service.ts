import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {NgServiceWorker} from '@angular/service-worker';
import {concat, takeUntil, debounceTime, startWith, filter, map, take} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

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

    this._checkForUpdateSubj.pipe(
      startWith(null),
      debounceTime(this._checkInterval),
      takeUntil(this._destroy)
    ).subscribe(() => this._checkForUpdate());

    this.updateActivated = this._sw.updates.pipe(
      filter(({type}) => type === 'activation'),
      map(({version}) => version),
      takeUntil(this._destroy)
    );
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  private _checkForUpdate() {
    // Temp workaround for https://github.com/angular/mobile-toolkit/pull/137.
    // TODO (): Remove once #137 is fixed.
    this._sw.checkForUpdate().pipe(
      concat(of(false)),
      take(1),
    ).subscribe(v => v ? this._activateUpdate() : this._scheduleCheckForUpdate());
  }

  private _activateUpdate() {
    this._sw.activateUpdate(null)
      .subscribe(() => this._scheduleCheckForUpdate());
  }

  private _scheduleCheckForUpdate() {
    this._checkForUpdateSubj.next();
  }
}
