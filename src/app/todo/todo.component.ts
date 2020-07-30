import { Component, OnInit } from '@angular/core';
import { Todo } from './todo.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as TodoActions from '../actions/todo.actions';
import { TodoService } from '../service/todo.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos$: Observable<any> = this.store.select('todos');
  listOfTodos: Todo[] = [];
  selectedTodo: Todo;

  fGTodoCreate = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  get first(): any {
    return this.fGTodoCreate.get('title');
  }

  onSubmit(): void {
    this.store.dispatch({
      type: '[Todo Create] Todo Create Page',
      title: this.fGTodoCreate.value.title
    });
    this.todoService.createTodo(this.fGTodoCreate.value.title);
  }

  constructor(
    private store: Store<{ todos: Todo[] }>,
    private todoService: TodoService
  ) {
    this.todos$.subscribe(data => {
      this.listOfTodos = data.listOfTodos;
      this.selectedTodo = new Todo(data);
    });
  }

  ngOnInit(): void {
    this.store.dispatch({ type: '[Todo Load Page] Load Todos' });
  }
}
