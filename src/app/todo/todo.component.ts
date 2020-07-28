import { Component, OnInit } from '@angular/core';
import {Todo} from './todo.model'
import {Observable} from 'rxjs'
import { Store} from '@ngrx/store'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos$: Observable<Todo[]> = this.store.select(state => state.todos);
  constructor(private store: Store<{ todos: Todo[] }>) { }

  // snippet from MyDataViewer.component.ts
  ngOnInit(): void {
    this.store.dispatch({ type: 'INIT_DATA' });
  }

}
