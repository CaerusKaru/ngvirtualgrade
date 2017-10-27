import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

const AddAssignment = gql`
mutation {
  addAssignment (assignment: $input) {
    id
  }
}
`;

@Injectable()
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
