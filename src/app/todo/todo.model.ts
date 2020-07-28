import {ITodo} from '../actions/todo.actions'

export class Todo implements ITodo {
    private _id: number;
    public getId() {
            return this._id;
        }

    private _title: string = '';
    public getTitle() {
            return this._title;
        }
    set title(value: string) {
        this._title = value;
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

    constructor({_id, _title, _detail, _position, _limit, _status}){
        this._id = _id;
        this._title = _title;
        if(!_detail) {
            this._detail = _title;
        }
        this._position = _position;
        this._limit = _limit;
        this._status = _status;
    }

}
