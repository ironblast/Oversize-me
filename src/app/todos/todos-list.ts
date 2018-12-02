import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromTodos from '../state/todos.reducer';
import * as todos from '../state/todos.actions';
import { Todo } from '../state/todo';

@Component({
  selector: 'app-todos-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './todos-list.html',
  styleUrls: ['./todos-list.scss']
  })

 export class TodosListComponent implements OnInit {
  todos$: Observable<Todo[]>;
  loading$: Observable<boolean>;
  saved$: Observable<boolean>;

  constructor(private store: Store<fromTodos.State>) {
    this.todos$ = this.store.pipe(select(fromTodos.selectAllTodos));
    this.loading$ = this.store.pipe(select(fromTodos.selectTodosLoading));
    this.saved$ = this.store.pipe(select(fromTodos.selectTodosSaved));
  }

  ngOnInit() {
    this.store.dispatch(new todos.Load());
  }

  switchTodoState(todo: Todo) {
    this.store.dispatch(new todos.Save(todo));
  }
}
