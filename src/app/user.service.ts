import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class UserService {

  private portalUrl = '/cr/getUser';

  constructor(
    private http: Http
  ) { }

  getUtln() : string {
    return 'aplume01';
  }

  isGrader() : boolean {
    return true;
  }

  isAdmin() : boolean {
    return true;
  }
}
