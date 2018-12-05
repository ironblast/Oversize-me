import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, take, filter, first } from 'rxjs/operators';
import * as fromTodos from '../state/todos.reducer';
import * as todos from '../state/todos.actions';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Todo } from '../state/todo';

@Component({
  selector: 'app-todo-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './todo-item.html',
  styleUrls: ['./todo-item.scss']
})

export class TodosItemComponent implements OnInit, OnDestroy {
  actionsSubscription: Subscription;
  refreshSubscription: Subscription;


  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromTodos.State>,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.createForm();

    // Load todos if not loaded
    this.store.pipe(
      select(fromTodos.getTodosLoaded),
      first()
    ).subscribe((loaded) => {
      if (!loaded) {
        this.store.dispatch(new todos.Load());
      }
    });

    // Observe on change todo id
    this.actionsSubscription = this.route.params
      .pipe(map(params => new todos.SelectOne(params.id)))
      .subscribe(this.store);

    // Observe when current todo is modified
    this.refreshSubscription = this.store.pipe(
      select(fromTodos.getCurrentTodo),
    ).subscribe((data) => {
      if (data) {
        this.form.patchValue(data);
      } else if (this.form.value.id) {
        this.router.navigate(['/todos', this.form.value.id]);
      }
    });
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
    this.refreshSubscription.unsubscribe();
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
      const newTodo: Todo = {
        ...this.form.value,
        lastUpdate: Date.now()
      };
      this.store.dispatch(new todos.Save(newTodo));
      this.form.reset();
      this.router.navigate(['/todos']);
    }
  }

  isError(field: string): boolean {
    const control = this.form.get(field);
    return !!(control && control.invalid);
  }

  previous(): void {
    this.router.navigate(['/todos', this.form.value.id - 1]);
  }

  next(): void {
    this.router.navigate(['/todos', this.form.value.id + 1]);
  }
}
