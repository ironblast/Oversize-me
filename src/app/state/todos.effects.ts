import { Injectable } from "@angular/core";
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { TodosService } from './todos.service';
import {
  TodosActionTypes,
  LoadFail,
  LoadSuccess
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
}