import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import * as AuthActions from '../../store/auth/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {
  name = '';
  surname = '';
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store<AppState>) {
    this.loading$ = this.store.select(s => s.auth.loading);
    this.error$ = this.store.select(s => s.auth.error);
  }

  register() {
    if (this.password !== this.confirmPassword) {
      return;
    }
    this.store.dispatch(AuthActions.register({
      name: this.name,
      surname: this.surname,
      username: this.username,
      email: this.email,
      password: this.password
    }));
  }
}