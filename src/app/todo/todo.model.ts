import { ITodo } from '../actions/todo.actions';

export class Todo implements ITodo {
  set title(value: string) {
    this._title = value;
  }
  set detail(value: string) {
    this._detail = value;
  }
  set limit(value: Date) {
    this._limit = value;
  }
  set status(value: string) {
    this._status = value;
  }
  set position(value: number) {
    this._position = value;
  }

  constructor({ _id, _title, _detail, _position, _limit, _status }) {
    this._id = _id;
    this._title = _title;
    if (!_detail) {
      this._detail = _title;
    }
    this._position = _position;
    this._limit = _limit;
    this._status = _status;
  }
  private _id: number;

  private _title = '';

  private _detail = '';

  private _limit: Date = new Date();

  private _status = 'draft';

  private _position = 0;
  public getId() {
    return this._id;
  }
  public getTitle() {
    return this._title;
  }
  public getDetail() {
    return this._detail;
  }
  public getLimit(): Date {
    return this._limit;
  }
  public getStatus(): string {
    return this._status;
  }
  public getPosition(): number {
    return this._position;
  }
}
