import { Action } from '@ngrx/store';
import { Todo } from './todo';

export enum TodosActionTypes {
  Load = '[Todos] Load',
  LoadSuccess = '[Todos] Load Success',
  LoadFail = '[Todos] Load Fail',
  Save = '[Todos] Save',
  SaveSuccess = '[Todos] Save Success',
  SaveFail = '[Todos] Save Fail',
  SelectOne = '[Todos] Select One',
  Delete = '[Todos] Delete',
  DeleteFail = '[Todos] Delete Fail',
  DeleteSuccess = '[Todos] Delete Success'
}

export class Load implements Action {
  readonly type = TodosActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = TodosActionTypes.LoadSuccess;
  constructor(public todos: Todo[]) { }
}

export class LoadFail implements Action {
  readonly type = TodosActionTypes.LoadFail;
  constructor(public payload: any) { }
}

export class Save implements Action {
  readonly type = TodosActionTypes.Save;
  constructor(public todo: Todo) { }
}

export class SaveSuccess implements Action {
  readonly type = TodosActionTypes.SaveSuccess;
  constructor(public todo: Todo) { }
}

export class SaveFail implements Action {
  readonly type = TodosActionTypes.SaveFail;
  constructor(public payload: any) { }
}

export class SelectOne implements Action {
  readonly type = TodosActionTypes.SelectOne;
  constructor(public todoId: string) { }
}

export class Delete implements Action {
  readonly type = TodosActionTypes.Delete;
  constructor(public todo: { id: number }) { }
}

export class DeleteFail implements Action {
  readonly type = TodosActionTypes.DeleteFail;
  constructor(public payload: any) { }
}

export class DeleteSuccess implements Action {
  readonly type = TodosActionTypes.DeleteSuccess;
  constructor(public todo: { id: number }) { }
}

export type TodosActions =
  | Load
  | LoadSuccess
  | LoadFail
  | Save
  | SaveSuccess
  | SaveFail
  | SelectOne
  | Delete
  | DeleteFail
  | DeleteSuccess;
