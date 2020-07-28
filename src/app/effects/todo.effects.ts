import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { Subscription } from 'rxjs';
import { TodoService } from '../service/todo.service';
import * as TodoActions from '../actions/todo.actions';
import { Todo } from '../todo/todo.model';

@Injectable()
export class TodoEffects {
  loading: boolean;
  todos: Array<Todo> = [];
  loadTodos$ = createEffect(() =>
    this.action$.pipe(
      ofType(TodoActions.load),
      mergeMap(() =>
        this.todoService.findTodos().pipe(
          map((data: Todo[]) => {
            console.log('in', data);
            this.todos = data;
            return TodoActions.todosApollo({ listOfTodos: data });
          }),
          catchError(({ message }) => {
            console.log(message);
            return of(TodoActions.loadError({ error: message }));
          })
        )
      )
    )
  );

  constructor(private action$: Actions, private todoService: TodoService) {}
}
