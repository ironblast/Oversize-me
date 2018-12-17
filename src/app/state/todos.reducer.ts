import { createSelector, createFeatureSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Todo } from './todo';
import { TodosActions, TodosActionTypes } from './todos.actions';

export interface State extends EntityState<Todo> {
  loading: boolean;
  loaded: boolean;
  saved: boolean;
  selectedId: string | number;
}

export function sortByState(todo1: Todo, todo2: Todo): number {
  if (todo1.state === todo2.state) {
    if (todo1.state) {
      return todo1.lastUpdate - todo2.lastUpdate;
    } else {
      return todo2.lastUpdate - todo1.lastUpdate;
    }
  } else if (todo1.state) {
    return 1;
  } else {
    return -1;
  }
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
  selectId: (todo: Todo) => todo.id,
  sortComparer: sortByState
});

// Initial state
export const initialState: State = adapter.getInitialState({
  data: [],
  loaded: false,
  loading: false,
  saved: false,
  selectedId: null
});

 export function reducer(state = initialState, action: TodosActions): State {
  switch (action.type) {
    case TodosActionTypes.Load: {
      return adapter.getInitialState({
        ...state,
        loading: true
      });
    }
    case TodosActionTypes.LoadSuccess: {
      return adapter.addMany(action.todos, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case TodosActionTypes.Save: {
      return {
        ...state,
        saved: true
      };
    }
    case TodosActionTypes.SaveSuccess: {
      return adapter.upsertOne(action.todo, {
        ...state,
        loaded: true,
        saved: true
      });
    }
    case TodosActionTypes.LoadFail:
    case TodosActionTypes.SaveFail:
      return {
        ...state,
        saved: false
      };
    case TodosActionTypes.SelectOne: {
      return {
        ...state,
        selectedId: action.todoId
      };
    }
    case TodosActionTypes.DeleteFail:
    case TodosActionTypes.Delete: {
      return {
        ...state
      };
    }
    case TodosActionTypes.DeleteSuccess: {
      return adapter.removeOne(action.todo.id, state);
    }
    default: {
      return state;
    }
  }
}

export const {
  selectIds: selectTodoIds,
  selectEntities: selectTodosEntities,
  selectAll: selectAllTodos,
  selectTotal: todosCount
} = adapter.getSelectors();

export const getTodosState = createFeatureSelector<State>('todos');

export const getTodosid = createSelector(getTodosState, selectTodoIds);
export const getTodosEntities = createSelector(getTodosState, selectTodosEntities);
export const getAllTodos = createSelector(getTodosState, selectAllTodos);
export const getCount = createSelector(getTodosState, todosCount);

export const getTodosLoading = createSelector(getTodosState, (state: State) => state.loading);
export const getTodosLoaded = createSelector(getTodosState, (state: State) => state.loaded);
export const getTodosSaved = createSelector(getTodosState, (state: State) => state.saved);
export const getSelectId = createSelector(getTodosState, (state: State) => state.selectedId);

export const getCurrentTodo = createSelector(getTodosEntities, getSelectId, (entities, todoId) => entities[todoId]);
