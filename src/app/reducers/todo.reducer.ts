import { createReducer, on, State } from '@ngrx/store';
import * as todoActions from '../actions/todo.actions';
import {
  createTodo,
  createTodoApollo,
  createTodoError,
  loadTodo,
  loadTodoApollo,
  loadTodoError,
  changeStatus,
  changeStatusApollo,
  changeStatusError,
  saveApollo,
  describe,
  swapApollo
} from '../actions/todo.actions';
import { Todo } from '../todo/todo.model';

export const initialState = {
  listOfTodos: [],
  _id: 0,
  title: '',
  detail: '',
  position: 0,
  status: '',
  _error: ''
};

export function selection(
  state,
  { _id, title, detail, position, status, _error }
) {
  state._id = _id;
  state.title = title;
  state.detail = detail;
  state.position = position;
  state.status = status;
  state._error = _error;
}

export function findAndReplaceInArray(state, newTodo): Todo[] {
  return state.listOfTodos.map((todo: Todo) =>
    todo.getId() === state._id
      ? Object.assign(
          {},
          {
            _id: newTodo.getId(),
            title: newTodo.getTitle(),
            detail: newTodo.getDetail(),
            position: newTodo.getPosition(),
            status: newTodo.getStatus()
          }
        )
      : todo
  );
}

const _todoReducer = createReducer(
  initialState,
  on(todoActions.createTodoApollo, (state, todo) => ({
    ...state,
    ...todo
  })),
  on(todoActions.createTodoError, (state, error) => ({ ...state, ...error })),
  on(todoActions.loadTodoApollo, (state, listOfTodos) => {
    return { ...state, ...listOfTodos };
  }),
  on(todoActions.loadTodoError, (state, error) => {
    return { ...state, ...error };
  }),
  // CHANGE STATE
  on(todoActions.changeStatus, (state, status) => ({
    ...state,
    ...status
  })),
  on(todoActions.changeStatusApollo, (state, { todo }) => {
    // ListOfTodos being change by the Apollo Cache
    return { ...state, listOfTodos: findAndReplaceInArray(state, todo) };
  }),
  on(todoActions.changeStatusError, (state, {error}) => ({
    ...state,
    _error: error
  })),
  // SELECTION
  /*
    on(todoActions.selection, (state, { todo }) => ({
      ...state,
      _id: todo.getId(),
      title: todo.getTitle(),
      detail: todo.getDetail(),
      position: todo.getPosition(),
      status: todo.getStatus(),
      _error: ''
    })),
    */
  // DESCRIBE
  on(todoActions.describe, (state, detail) => ({
    ...state,
    ...detail
  })),
  on(todoActions.saveApollo, (state, { todo }) => ({
    ...state,
    listOfTodos: [
      ...state.listOfTodos,
      {
        _id: todo.getId(),
        _title: todo.getTitle(),
        detail: todo.getDetail(),
        position: todo.getPosition(),
        status: todo.getStatus()
      }
    ]
  })),
  on(todoActions.saveError, (state, { error }) => ({
    ...state,
    _error: error
  })),

  on(todoActions.swapApollo, (state, position) => {
    const list = state.listOfTodos.slice();
    [list[position[0]], position[1]] = [list[position[1]], position[0]];
    return { ...state, listOfTodos: list };
  })
  /*
    on(todoActions.change, (state, newTodo) => {
      const list = state.listOfTodos.map((todo: Todo) =>
        todo.getId() === state._id
          ? Object.assign(
              {},
              {
                _id: newTodo.getId(),
                _title: newTodo.getTitle(),
                detail: newTodo.getDetail(),
                position: newTodo.getPosition(),
                status: newTodo.getStatus()
              }
            )
          : todo
      );
      return { ...state, listOfTodos: list };
    }),
  */
);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
