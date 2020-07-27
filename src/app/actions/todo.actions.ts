export const create = createAction(
  '[Todo Create] Create',
  props<{ id: number }>()
);

export const modify = createAction(
  '[Todo Modify] Create',
  props<{ id: number }>()
);

export const archiver = createAction(
  '[Todo Archive] Create',
  props<{ id: number }>()
);

export const delete = createAction(
  '[Todo Delete] Create',
  props<{ id: number }>()
);

export const check = createAction(
  '[Todo Check] Checks',
  props<{ id: number }>()
);
