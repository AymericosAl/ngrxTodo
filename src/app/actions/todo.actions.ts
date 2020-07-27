import { createAction, props } from '@ngrx/store';

export const create = createAction(
  '[Todo Create] Create',
  props<{ id: number }>()
);

export const modify = createAction(
  '[Todo Modify] Create',
  props<{ id: number }>()
);

export const describe = createAction(
  '[Todo Modify] Describe',
  props<{ id: number, detail: string }>()
);

export const archive = createAction(
  '[Todo Archive] Create',
  props<{ id: number }>()
);

export const remove = createAction(
  '[Todo Delete] Create',
  props<{ id: number }>()
);

export const check = createAction(
  '[Todo Check] Checks',
  props<{ id: number }>()
);

export const save = createAction(
  '[Todo Modify] save in BDD',
  props<{ id: number }>()
);

export const swap = createAction(
  '[Todo Modify] switch with other Todo',
  props<{ id: number }>()
);
