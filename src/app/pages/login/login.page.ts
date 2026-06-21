import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import * as AuthActions from '../../store/auth/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  username = '';
  password = '';
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store<AppState>) {
    this.loading$ = this.store.select(s => s.auth.loading);
    this.error$ = this.store.select(s => s.auth.error);
  }

  login() {
    if (this.username && this.password) {
      this.store.dispatch(AuthActions.login({ username: this.username, password: this.password }));
    }
  }

  loginAsGuest() {
    this.store.dispatch(AuthActions.login({ username: 'guest', password: 'guest' }));
  }
}