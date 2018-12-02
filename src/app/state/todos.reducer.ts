import { createSelector, createFeatureSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Todo } from './todo';
import { TodosActions, TodosActionTypes } from './todos.actions';

export interface State extends EntityState<Todo> {
  loading: boolean;
  loaded: boolean;
  saved: boolean;
}

export function sortByState(a: Todo, b: Todo): number {
  return a.state === b.state ? a.id - b.id : b.state ? -1 : 1;
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
  selectId: (todo: Todo) => todo.id,
  sortComparer: sortByState
})

// Initial state
export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: false,
  saved: false
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
    case TodosActionTypes.LoadFail: {
      return {
        ...state,
        loaded: false
      };
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
    case TodosActionTypes.SaveFail: {
      return {
        ...state,
        saved: false
      };
    }
    default: {
      return state;
    }
  }
}

export const getTodosState = createFeatureSelector<State>('todos');

export const getTodosLoading = (state: State) => state.loading;
export const getTodosSaved = (state: State) => state.saved;

export const selectTodosLoading = createSelector(getTodosState, getTodosLoading);
export const selectTodosSaved = createSelector(getTodosState, getTodosSaved);

export const { selectAll: selectAllTodos } = adapter.getSelectors(getTodosState);
