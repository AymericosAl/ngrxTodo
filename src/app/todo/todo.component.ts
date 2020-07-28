import { Component, OnInit } from '@angular/core';
import {Todo} from './todo.model';
import {Observable} from 'rxjs';
import { Store} from '@ngrx/store';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as TodoActions from '../actions/todo.actions';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos$: Observable<any> = this.store.select('todos');
  listOfTodos: Todo[] = [];
  selectedTodo: Todo;

  FG_todoCreate = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.minLength(2)])
    });

    get first(): any {
        return this.FG_todoCreate.get('title');
      }

      onSubmit(): void {
        this.store.dispatch({ type: '[Todo Create] Create', _title: this.FG_todoCreate.value.title });
      }


 constructor(private store: Store<{ todos: Todo[] }>) {
    this.todos$.subscribe((data) => {
        this.listOfTodos = data.listOfTodos;
        this.selectedTodo = new Todo(data);
        console.log(this.listOfTodos);
        console.log(this.selectedTodo);

    });
 }

  ngOnInit(): void {
    this.store.dispatch({ type: '[Todo Load Page] Load Todos' });
    console.log(this.todos$);
  }


}
