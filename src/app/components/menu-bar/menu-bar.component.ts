import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app.state';
import * as AuthActions from '../../store/auth/auth.actions';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
  standalone: false
})
export class MenuBarComponent {
  isAuthenticated$: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {
    this.isAuthenticated$ = this.store.select(s => s.auth.isAuthenticated);
  }

  navigateTo(path: string) {
    this.router.navigateByUrl(path);
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
    this.router.navigateByUrl('/home');
  }

  createTrack() {
    this.router.navigateByUrl('/create-track');
  }
}