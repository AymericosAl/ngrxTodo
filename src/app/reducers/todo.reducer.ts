import { createReducer, on, State } from '@ngrx/store';
import * as todoActions from '../actions/todo.actions';
import { create, modify, changeStatus, save, swap } from '../actions/todo.actions';
import { Todo } from '../todo/todo.model';

export const initialState = {
    listOfTodos: [],
    _id: 0,
    _title: '',
    _detail: '',
    _position: 0,
    _status: '',
    _error: ''
};

const _todoReducer = createReducer(initialState,
  on(todoActions.create, ( state, {_title, _position}) => (
    {...state,
    _title
    })
  ),
  on(todoActions.describe, (state, obj) => ({...state,
    _detail: obj._detail
  })),
  on(todoActions.changeStatus, (state, {_status}) => ({...state,
    _status
  })),
  // on(todoActions.changeStatus, (state, status) => ({...state, _status: status })),
  on(todoActions.save, (state, todo) => (
        {...state,
        listOfTodos: [...state.listOfTodos,
            {
                _id: todo.getId(),
                _title: todo.getTitle(),
                _detail: todo.getDetail(),
                _position: todo.getPosition(),
                _status: todo.getStatus()
            }
        ]
    })
  ),
  on(todoActions.modify, (state, newTodo)  => {
    const list = state.listOfTodos.map((todo: Todo) =>
        todo.getId() === state._id ? Object.assign({},
            {
                _id: newTodo.getId(),
                _title: newTodo.getTitle(),
                _detail: newTodo.getDetail(),
                _position: newTodo.getPosition(),
                _status: newTodo.getStatus()
            }) : todo
         );
    return {...state, listOfTodos: list};
  }),
  on(todoActions.swap, (state, position) => {
    const list = state.listOfTodos.slice();
    [list[position[0]], position[1]] = [list[position[1]], position[0]];
    return {...state, listOfTodos: list};
  }),
  on(todoActions.todosApollo, (state, {listOfTodos}) => {
    return {...state, listOfTodos};
  }),
  on(todoActions.loadError, (state, error) => {
    return {...state, error};
  })
);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
