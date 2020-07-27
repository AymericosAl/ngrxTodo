import { createReducer, on } from '@ngrx/store';
import * as todoActions from '../actions/todo.actions';
import { create, modify, archive, delete, check } from './actions/todo.actions';

export interface ITodo {
  id: string
  name: string
  detail: number
  position: number
}

class Todo {

    private _name: string = false;
    get name(): string {
        return this._name;
    }
    set name(value: string) {
        this._name = value;
    }

    private _detail: string = false;
    get detail(): string {
        return this._detail;
    }
    set detail(value: string) {
        this._detail = value;
    }

    private _limit: date = false;
    get limit(): date {
        return this._limit;
    }
    set limit(value: date) {
        this._limit = value;
    }

    constructor(obj: any){
        this.id = obj.id;
        this.name = obj.name;
        if(!obj.detail) {
            this.detail = this.name;
        }
    }

}

export interface State {
  listOfTodos: array<Todo>;
  selectedTodo: Todo;
}

export const initialState = { id: 0};

export fonction (messages, message) =>
  messages.map(m =>
    m.id === message.id ? Object.assign({}, message) : message
  );

const _todoReducer = createReducer(initialState,
  on(create, (state, obj) => {...state,
    id: Maths.ramdom() * 1000
    name: obj.name
  }),
  on(describe, (state, obj) => {...state,
    detail: obj.detail
  }),
  on(archive, state => {...state, status: 'archived' }),
  on(remove, state => {...state, status: 'removed' }),
  on(remove, state => {...state, status: 'finished' }),
  on(save, state => [...listOfTodos, selectedTodo]),
  on(update, state => {
    const list = listOfTodos.map(m =>
        m.id === selectedTodo.id ? Object.assign({}, message) : message
         );
    return {...state, listOfTodo: list}
  });
  on(switch, state => {
    const list = listOfTodos.map();
    [list[position[0]], position[1]] = [list[position[1]], position[0]];
    return {...state, listOfTodo: list}
  });

export function counterReducer(state, action) {
  return _counterReducer(state, action);
}
