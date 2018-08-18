import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {AddAssignment} from '@app/shared/graphql/mutations/AddAssignment';

@Injectable({providedIn: 'root'})
export class AdminService {

  constructor(
    private _apollo: Apollo,
  ) { }

  addAssignment (assignment) {
    console.log(assignment);
    this._apollo.mutate({
      mutation: AddAssignment,
      variables: {
        input: assignment
      }
    }).subscribe(data => console.log(data), error => console.error(error));
  }
}
