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

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private apollo: Apollo) {
    this.findTodos().subscribe(data => {
      console.log(data);
    });
  }

  findTodos(): Observable<any> {
    return this.apollo
      .watchQuery({ query: FIND_TODOS })
      .valueChanges.pipe(map(({ data }) => data['findTodos']));
    //return of([new Todo({})])
  }
}
