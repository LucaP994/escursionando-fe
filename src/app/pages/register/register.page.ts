import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import * as AuthActions from '../../store/auth/auth.actions';
import { selectAuthLoading, selectAuthError } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPage {
  private store = inject(Store<AppState>);

  name = signal('');
  surname = signal('');
  username = signal('');
  email = signal('');
  password = signal('');
  confirmPassword = signal('');
  loading = this.store.selectSignal(selectAuthLoading);
  error = this.store.selectSignal(selectAuthError);

  register() {
    if (this.password() !== this.confirmPassword()) return;
    this.store.dispatch(AuthActions.register({
      name: this.name(),
      surname: this.surname(),
      username: this.username(),
      email: this.email(),
      password: this.password()
    }));
  }
}