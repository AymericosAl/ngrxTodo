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

@Injectable()
export class CreateTodo extends Mutation {
  document = gql`
    mutation mutationCreateTodo($todo: TodoInput) {
      CreateTodo(todo: $todo) {

            _id

      }
    }
  `;
}

type Response = {
    findTodos: Todo[];
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private apollo: Apollo, private CreateTodo: CreateTodo) {
    this.createTodo('Un Titre').subscribe((data) => {console.log(data)})
}

  findTodos(): Observable<any> {
    return this.apollo
      .watchQuery<Response>({ query: FIND_TODOS })
      .valueChanges.pipe(map(({data}) => {
            return data.findTodos
        }));
  }



    createTodo(title: string) {
        return this.CreateTodo.mutate({
            todo: {
                title: title,
                detail: '',
                position: 0,
                limit: 0,
                date: 0
            }
            //,
            //refetchQueries: [{query: FIND_TODOS }]
        })
    }
}
