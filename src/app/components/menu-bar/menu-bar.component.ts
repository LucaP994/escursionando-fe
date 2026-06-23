import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectIsAuthenticated } from '../../store/auth/auth.selectors';
import * as AuthActions from '../../store/auth/auth.actions';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuBarComponent {
  private router = inject(Router);
  private store = inject(Store<AppState>);

  isAuthenticated = this.store.selectSignal(selectIsAuthenticated);

  navigateTo(path: string) { this.router.navigateByUrl(path); }

  logout() {
    this.store.dispatch(AuthActions.logout());
    this.router.navigateByUrl('/home');
  }

  createTrack() { this.router.navigateByUrl('/create-track'); }
}