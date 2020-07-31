import { createAction, props } from '@ngrx/store';

import { Todo } from '../todo/todo.model';

// CREATE
// Local action: create local todo
export const createTodo = createAction('[Todo Create] Todo Create Page');
// Once local Todo is asked to be saved, response from server
export const createTodoApollo = createAction(
  '[Todo Create] Todo Create Success',
  props<{ todo: Todo }>()
);
// Error from NodeJS
export const createTodoError = createAction(
  '[Todo Create] Todo Create Error',
  props<{ error: string }>()
);

// LOAD
// Asking local to load for the server and BDD
export const loadTodo = createAction('[Todo Load Page] Load Todos');
// Once load request is received response from the server and BDD
export const loadTodoApollo = createAction(
  '[Todo Apollo] Todos Loaded Success',
  props<{ listOfTodos: Todo[] }>()
);
export const loadTodoError = createAction(
  '[Todo Load Error] Error in Load of Todos',
  props<{ error: string }>()
);

// CHANGESTATUS
// Local action: Change the state of the Todo => Todo, Finished, Removed, Draft
export const changeStatus = createAction(
  '[Todo ChangeState] Todo ChangeStatus Page',
  props<{ todo: Todo }>()
);
// Once local Todo new state asked to be saved, response from server
export const changeStatusApollo = createAction(
  '[Todo ChangeState] Todo ChangeStatus Success',
  props<{ todo: Todo }>()
);
// Error from NodeJS
export const changeStatusError = createAction(
  '[Todo Change] Todo ChangeStatus Error',
  props<{ error: string }>()
);

// SAVE
// Local save action using local Todo
export const save = createAction('[Todo Save Page] Save Todo');
// Once local Todo is asked to be saved response from the server and BDD.
export const saveApollo = createAction(
  '[Todo Save] Save Todo Sucess',
  props<{ todo: Todo }>()
);
// Error from NodeJS
export const saveError = createAction(
  '[Todo Save Error] Error in Save of Todo',
  props<{ error: string }>()
);

// @TODO: SWAP
// Local action of swaping (switching place) two Todo
export const swap = createAction(
  '[Todo Swap Page] Todo Swap',
  props<{ _id: number }>()
);
// Once swap is asked to be made response from the server and BDD
export const swapApollo = createAction(
  '[Todo Swap] Swap Save Success',
  props<{ _id: number }>()
);
export const swapError = createAction(
  '[Todo Swap Error] Swap Save Success',
  props<{ _id: number }>()
);

// @TODO: SELECTION
// Select local Todo
export const selection = createAction(
  '[Todo Selection Page] Selecting Todo local',
  props<{ toto: Todo }>()
);

// @TODO: DETAIL
// Local action using local single input from component
export const describe = createAction('[Todo Change Page] Describe Todo local');
