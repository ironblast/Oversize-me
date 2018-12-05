import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { TodosService } from './todos.service';
import {
  TodosActionTypes,
  LoadFail,
  LoadSuccess,
  Save,
  SaveSuccess,
  SaveFail,
  Delete,
  DeleteFail,
  DeleteSuccess
} from './todos.actions';
import { Todo } from './todo';

@Injectable()
export class TodosEffects {

  constructor(private action$: Actions, private todoService: TodosService) { }

  @Effect()
  loadTodos$: Observable<Action> = this.action$.pipe(
    ofType(TodosActionTypes.Load),
    switchMap(() =>
      this.todoService.getTodos().pipe(
        map((todos: Todo[]) => new LoadSuccess(todos)),
        catchError(error => of(new LoadFail(error)))
      )
    )
  );

  @Effect()
  saveTodos$: Observable<Action> = this.action$.pipe(
    ofType(TodosActionTypes.Save),
    switchMap((action: Save) =>
    this.todoService.saveTodo(action.todo).pipe(
      map((todo: Todo) => new SaveSuccess(todo)),
      catchError(error => of(new SaveFail(error)))
    ))
  );

  @Effect()
  deleteTodos$: Observable<Action> = this.action$.pipe(
    ofType(TodosActionTypes.Delete),
    switchMap((action: Delete) =>
    this.todoService.deleteTodo(action.todo.id).pipe(
      map((() => new DeleteSuccess(action.todo)),
      catchError((error) => of(new DeleteFail(error)))
    ))
  ));
}
