import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import * as AuthActions from '../../store/auth/auth.actions';
import { selectAuthLoading, selectAuthError } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPage {
  private store = inject(Store<AppState>);

  username = signal('');
  password = signal('');
  loading = this.store.selectSignal(selectAuthLoading);
  error = this.store.selectSignal(selectAuthError);

  login() {
    if (this.username() && this.password()) {
      this.store.dispatch(AuthActions.login({ username: this.username(), password: this.password() }));
    }
  }

  loginAsGuest() {
    this.store.dispatch(AuthActions.login({ username: 'guest', password: 'guest' }));
  }
}