import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../material/material.module';
import * as fromTodos from './todos.reducer';
import { TodosEffects } from './todos.effects';
import { TodosService } from './todos.service';
import { TodosListComponent } from '../todos/todos-list';
import { TodosItemComponent } from '../todos/todo-item';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      { path: '', component: TodosListComponent },
      { path : ':id', component: TodosItemComponent }
    ]),
    StoreModule.forFeature('todos', fromTodos.reducer),
    EffectsModule.forFeature([TodosEffects]),
  ],
  declarations: [
    TodosListComponent,
    TodosItemComponent
  ],
  providers: [TodosService],
})
export class TodosModule { }
