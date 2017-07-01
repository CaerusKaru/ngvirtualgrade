import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'vg-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  entityName: string = environment.ENTITY_NAME;
  error = false;

  private _returnUrl: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this._returnUrl = this._route.snapshot.queryParams['returnPath'] || '/';
  }

  login (f: NgForm) {
    if (!f.value.username) {
      this.error = true;
      return;
    }
    this._authService.login(f.value.username, f.value.password).subscribe(
      data => {
        this._router.navigate([this._returnUrl]);
      },
      error => {
        this.error = true;
      }
    );
  }
}
