import {ITodo} from '../actions/todo.actions'

export class Todo implements ITodo {
    private _id: number;
    public getId() {
            return this._id;
        }

    private _name: string = '';
    public getName() {
            return this._name;
        }
    set name(value: string) {
        this._name = value;
    }

    private _detail: string = '';
    public getDetail() {
            return this._detail;
        }
    set detail(value: string) {
        this._detail = value;
    }

    private _limit: Date = new Date();
    public getLimit(): Date {
        return this._limit;
    }
    set limit(value: Date) {
        this._limit = value;
    }

    private _status: string = 'draft';
    public getStatus(): string {
        return this._status;
    }
    set status(value: string) {
        this._status = value;
    }

    private _position: number = 0;
    public getPosition(): number {
        return this._position;
    }
    set position(value: number) {
        this._position = value;
    }

    constructor(obj: any){
        this._id = obj._id;
        this._name = obj._name;
        if(!obj._detail) {
            this._detail = this._name;
        }
    }

}
