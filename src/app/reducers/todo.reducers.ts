import { Action, createReducer, on } from '@ngrx/store';
import * as todoActions from '../actions/todo.actions';

export interface ITodo {
  id: string
  name: string
  detail: number
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
