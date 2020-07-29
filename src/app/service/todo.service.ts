import { Injectable } from '@angular/core';
import { Apollo, Mutation } from 'apollo-angular';
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

const documentCreate = gql`
  mutation mutationCreateTodo($todo: TodoInput) {
    CreateTodo(todo: $todo) {
      _id
    }
  }
`;

type ResponseQuery = {
  findTodos: Todo[];
};

type ResponseMutation = {
  CreateTodo: { _id: number };
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private apollo: Apollo) {}

  findTodos(): Observable<Todo[]> {
    return this.apollo
      .watchQuery<ResponseQuery>({
        query: FIND_TODOS,
        variables: { username: 'Johnny' }
      })
      .valueChanges.pipe(
        map(({ data }) => {
          return data.findTodos;
        })
      );
  }

  createTodo(title: string): void {
    const todo = {
      title,
      detail: '',
      position: null,
      limit: null,
      date: null,
      status: ''
    };
    this.apollo
      .mutate<ResponseMutation>({
        mutation: documentCreate,
        variables: {
          todo
        },
        update: (store, { data }) => {
          const todoFromDB = new Todo(data.CreateTodo._id).setFromBDD(todo);
          // Read the data from our cache for this query.
          const queryCache = store.readQuery<ResponseQuery>({
            query: FIND_TODOS,
            variables: { username: 'Johnny' }
          });
          queryCache.findTodos = [...queryCache.findTodos, todoFromDB];
          // Write our data back to the cache.
          store.writeQuery({ query: FIND_TODOS, data });
        }
      })
      .subscribe();
  }
}
