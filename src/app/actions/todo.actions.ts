import { createAction, props } from '@ngrx/store';

import { Todo } from '../todo/todo.model';

export interface ITodo {
  getId(): number;
  getTitle(): string;
  getDetail(): string;
  getPosition(): number;
  getStatus(): string;
}


export const create = createAction(
  '[Todo Create] Create',
    props<{_title: string, _position: number}>()
);

export const describe = createAction(
  '[Todo Modify] Describe',
  props<{ _id: number, _detail: string }>()
);


export const modify = createAction(
  '[Todo Modify] Create',
  props<ITodo>()
);

// Remove, Check (finished),
export const changeStatus = createAction(
  '[Todo Archive] Change Status',
  props<{_status: string}>()
);

export const save = createAction(
  '[Todo Modify] save in BDD',
  props<ITodo>()
);

export const swap = createAction(
  '[Todo Modify] switch with other Todo',
  props<{ _id: number }>()
);

export const load = createAction(
  '[Todo Load Page] Load Todos'
);

export const todosApollo = createAction(
  '[Todo Apollo] Todos Loaded Success',
  props<{ listOfTodos: Todo[] }>()
);

export const loadError = createAction(
  '[Todo Load Error] Error',
  props<{ error: string }>()
);
