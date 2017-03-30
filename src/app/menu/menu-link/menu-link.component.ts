import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {MenuService} from "../shared/menu.service";
import {MenuLink} from "../shared/menu-link";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'menu-link',
  templateUrl: './menu-link.component.html',
  styleUrls: ['./menu-link.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuLinkComponent implements OnInit {

  @Input() section : MenuLink;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuService : MenuService
  ) { }

  ngOnInit() {
  }

  isSelected () {
    return this.menuService.isPageSelected(this.section);
  };

  navigate(url) {
    this.router.navigate([url]);
  }
}
