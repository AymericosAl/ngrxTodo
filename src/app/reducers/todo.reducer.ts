import { createReducer, on, State } from '@ngrx/store';
import * as todoActions from '../actions/todo.actions';
import { create, modify, archive, remove, check } from '../actions/todo.actions';
import { Todo } from '../todo/todo.model'

export const initialState = {
    listOfTodos: [],
    _id: 0,
    _name: '',
    _detail: '',
    _position: '',
    _state: ''
};

const _todoReducer = createReducer(initialState,
  on(todoActions.create, (state, obj) => ({...state,
    _id: Math.random() * 1000,
    _name: obj._name
  })),
  on(todoActions.describe, (state, obj) => ({...state,
    _detail: obj._detail
  })),
  on(todoActions.archive, state => ({...state, _status: 'archived' })),
  on(todoActions.remove, state => ({...state, _status: 'removed' })),
  on(todoActions.check, state => ({...state, _status: 'finished' })),
  on(todoActions.save, state => (
        {...state,
        listOfTodos: [...state.listOfTodos,
            {
                _id: state._id,
                _name: state._name,
                _detail: state._detail,
                _position: state._position,
                _status: state._status
            }
        ]
    })
  ),
  on(todoActions.modify, state => {
    const list = state.listOfTodos.map(todo =>
        todo.id === state._id ? Object.assign({},
            {
                _id: state._id,
                _name: state._name,
                _detail: state._detail,
                _position: state._position,
                _status: state._status
            }) : todo
         );
    return {...state, listOfTodos: list}
  }),
  on(todoActions.swap, (state, position) => {
    const list = state.listOfTodos.map();
    [list[position[0]], position[1]] = [list[position[1]], position[0]];
    return {...state, listOfTodos: list}
  })
);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
