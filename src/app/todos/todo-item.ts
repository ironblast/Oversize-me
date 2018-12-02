import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromTodos from '../state/todos.reducer';
import * as todos from '../state/todos.actions';
import { Todo } from '../state/todo';

@Component({
  selector: 'app-todo-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './todo-item.html',
  styleUrls: ['./todo-item.scss']
})

export class TodosItemComponent implements OnDestroy {
  actionsSubscription: Subscription;
  todo$: Observable<Todo>;
  constructor(private store: Store<fromTodos.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .pipe(map(params => new todos.SelectOne(params.id)))
      .subscribe(store);
    this.todo$ = store.pipe(select(fromTodos.getCurrentTodo));
  }
  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
