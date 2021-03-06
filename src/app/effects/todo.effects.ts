import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, pluck, exhaustMap } from 'rxjs/operators';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { Subscription } from 'rxjs';
import { TodoService } from '../service/todo.service';
import * as TodoActions from '../actions/todo.actions';
import { Todo } from '../todo/todo.model';

@Injectable()
export class TodoEffects {
  loading: boolean;
  todos: Array<Todo> = [];
  constructor(private action$: Actions, private todoService: TodoService) {}

loadTodos$ = createEffect(() =>
    this.action$.pipe(
      ofType(TodoActions.loadTodo),
      mergeMap(() =>
        this.todoService.findTodos().pipe(
          map((data: Todo[]) => {
            this.todos = data;
            return TodoActions.loadTodoApollo({ listOfTodos: data });
          }),
          catchError(({ message }) => {
            return of(TodoActions.loadTodoError({ error: message }));
          })
        )
      )
    )
  );



  changeStatus$ = createEffect(() =>
    this.action$.pipe(
      ofType(TodoActions.changeStatus),
      exhaustMap((action) => {
          return this.todoService.updateTodo(action.todo)
              .pipe(
                map(result => TodoActions.changeStatusApollo({todo: action.todo})),
                catchError((err: Error) => of(TodoActions.saveError({error: err.message} )))
              )
            })
        )
    )

}
