import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, take, filter } from 'rxjs/operators';
import * as fromTodos from '../state/todos.reducer';
import * as todos from '../state/todos.actions';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './todo-item.html',
  styleUrls: ['./todo-item.scss']
})

export class TodosItemComponent implements OnDestroy {
  actionsSubscription: Subscription;

  saved$ = this.store.pipe(select(fromTodos.getTodosSaved));

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromTodos.State>,
    private router: Router,
    route: ActivatedRoute
  ) {
    this.createForm();
    this.actionsSubscription = route.params
      .pipe(map(params => new todos.SelectOne(params.id)))
      .subscribe(store);
    this.store.pipe(
      select(fromTodos.getCurrentTodo),
      take(1)
    ).subscribe((data) => {
      if (data) {
        this.form.patchValue(data);
      }
    });
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }

  createForm() {
    this.form = this.fb.group({
      id: null,
      state: false,
      title: ['', Validators.required],
      description: ''
    });
  }

  getErrorMessage(field: string) {
    return this.form.get(field).hasError('required') ? 'Titre obligatoire' : '';
  }

  submit() {
    this.form.updateValueAndValidity();
    if (!this.form.invalid) {
      this.store.dispatch(new todos.Save(this.form.value));
      this.saved$.pipe(
        filter(value => !value),
        take(1)
      ).subscribe(() => {
        this.form.reset();
        this.router.navigate(['/todos']);
      });
    }
  }

  isError(field: string): boolean {
    const control = this.form.get(field);
    return !!(control && control.invalid);
  }
}
