import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../material/material.module';
import * as fromTodos from './todos.reducer';
import { TodosEffects } from './todos.effects';
import { TodosService } from './todos.service';
import { TodosListComponent } from '../todos/todos-list';
 @NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild([
      { path: '', component: TodosListComponent },
    ]),
    StoreModule.forFeature('todos', fromTodos.reducer),
    EffectsModule.forFeature([TodosEffects]),
  ],
  declarations: [
    TodosListComponent
  ],
  providers: [TodosService],
})
export class TodosModule { }
