import { ITodo } from '../actions/todo.actions';

export class Todo implements ITodo {
  constructor(_id) {
    this._id = _id;
  }

  private _id: number;

  private title = '';

  private detail = '';

  private limit: Date = new Date();

  private status = 'draft';

  private position = 0;

  setFromBDD({ title, detail, position, limit, status }): Todo {
    this.title = title;
    this.detail = detail;
    this.position = position;
    this.limit = limit;
    this.status = status;
    return this;
  }
  setTitle(value: string): void {
    this.title = value;
  }
  setDetail(value: string): void {
    this.detail = value;
  }
  setLimit(value: Date): void {
    this.limit = value;
  }
  setStatus(value: string): void {
    this.status = value;
  }
  setPosition(value: number): void {
    this.position = value;
  }
  public getId(): number {
    return this._id;
  }
  public getTitle(): string {
    return this.title;
  }
  public getDetail(): string {
    return this.detail;
  }
  public getLimit(): Date {
    return this.limit;
  }
  public getStatus(): string {
    return this.status;
  }
  public getPosition(): number {
    return this.position;
  }
}
