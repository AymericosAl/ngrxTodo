import { createAction, props } from '@ngrx/store';

import { Todo } from '../todo/todo.model'

export interface ITodo {
  _id: number
  _name: string
  _detail: string
  _position: number
  _status: string
}


export const create = createAction(
  '[Todo Create] Create',
    props<{_name: string, _position: number}>()
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
