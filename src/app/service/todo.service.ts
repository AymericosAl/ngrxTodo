import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Todo } from '../todo/todo.model';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
// We use the gql tag to parse our query string into a query document
const FIND_TODOS = gql`
  query queryFindTodos($username: String) {
    findTodos(username: $username) {
      _id
      title
      detail
    }
  }
`;

type Response = {
    findTodos: Todo[];
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private apollo: Apollo) { }

  findTodos(): Observable<any> {
    return this.apollo
      .watchQuery<Response>({ query: FIND_TODOS })
      .valueChanges.pipe(map(({data}) => {
            return data.findTodos
        }));
  }
}
