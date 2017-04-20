import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {NavigationEnd, Router} from "@angular/router";
import {Location} from "@angular/common";

@Injectable()
export class NavMenuService {

  constructor(
    private router: Router,
    private location : Location,
  ) {
    this.openPage = this._currentPage.asObservable();
    this.openSection = this._openedSection.asObservable();
    this.initRouter();
  }

  public openPage : Observable<number>;
  public openSection : Observable<number>;

  public addLink (id : number, link : string, parent : number) {
    this._links.push({
      id: id,
      link: link,
      parent: parent
    })
  }

  public removeLink (id : number, link : string, parent : number) {
    this._links.splice(this._links.indexOf({
      id: id,
      link: link,
      parent: parent
    }), 1);
  }

  public selectSection (id : number) {
    this._openedSection.next(id);
  }

  public toggleSelectSection (id : number) {
    this._openedSection.next(this._openedSection.getValue() === id ? null : id);
  }

  public selectPage (id : number) {
    this._currentPage.next(id);
  }

  public isPageSelected (page) {
    return this._currentPage.getValue() === page;
  }

  private _links : any[] = [];
  private _openedSection : BehaviorSubject<number> = new BehaviorSubject(null);
  private _currentPage : BehaviorSubject<number> = new BehaviorSubject(null);

  private initRouter () {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event) => this.updateSelection());
  }

  private updateSelection () {
    this._links.forEach(i => {
      this.matchPage(i.id, i.link, i.parent);
    });
  }

  private matchPage (page, url, section) {
    if (this.location.path().indexOf(url) !== -1) {
      this.selectSection(section);
      this.selectPage(page);
    }
  };
}
