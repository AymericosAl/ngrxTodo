export class Todo {
  constructor(_id: number) {
    this._id = _id;
  }

  readonly _id: number;

  title = '';

  detail = '';

  limit: Date = new Date();

  status = 'draft';

  position = 0;

  setFromBDD({ title, detail, position, limit, status }): Todo {
    this.title = title;
    this.detail = detail;
    this.position = position;
    this.limit = limit;
    this.status = status;
    return this;
  }
}
