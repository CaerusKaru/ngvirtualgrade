import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnPath'] || '/';
  }

  public entityName : string = environment.ENTITY_NAME;
  public error : boolean = false;

  login (f : NgForm) {
    if (!f.value.username) {
      this.error = true;
      return;
    }
    this.authService.login(f.value.username, f.value.password).subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.error = true;
      }
    );
  }

  private returnUrl : string;
}
