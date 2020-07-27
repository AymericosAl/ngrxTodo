
export interface ITodo {
  _id: number
  _name: string
  _detail: string
  _position: number
}

export class Todo {
    private _id: number;
    _position: number
    private _name: string = '';
    get name(): string {
        return this._name;
    }
    set name(value: string) {
        this._name = value;
    }

    private _detail: string = '';
    get detail(): string {
        return this._detail;
    }
    set detail(value: string) {
        this._detail = value;
    }

    private _limit: Date = new Date();
    get limit(): Date {
        return this._limit;
    }
    set limit(value: Date) {
        this._limit = value;
    }

    constructor(obj: any){
        this._id = obj._id;
        this._name = obj._name;
        if(!obj._detail) {
            this._detail = this._name;
        }
    }

}
