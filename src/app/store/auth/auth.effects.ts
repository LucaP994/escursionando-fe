import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map(response => AuthActions.loginSuccess({
            user: response.user,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken
          })),
          catchError(error => of(AuthActions.loginFailure({
            error: error.error?.message || 'Errore di login'
          })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => this.router.navigate(['/home']))
    ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ name, surname, username, email, password }) =>
        this.authService.register(name, surname, username, email, password).pipe(
          map(response => AuthActions.registerSuccess({
            user: response.user,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken
          })),
          catchError(error => of(AuthActions.registerFailure({
            error: error.error?.message || 'Errore di registrazione'
          })))
        )
      )
    )
  );

  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerSuccess),
      tap(() => this.router.navigate(['/home']))
    ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => this.router.navigate(['/home']))
    ),
    { dispatch: false }
  );

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadProfile),
      switchMap(() =>
        this.authService.getProfile().pipe(
          map(user => AuthActions.loadProfileSuccess({ user })),
          catchError(error => of(AuthActions.loadProfileFailure({
            error: error.error?.message || 'Errore caricamento profilo'
          })))
        )
      )
    )
  );

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateProfile),
      switchMap(({ user }) =>
        this.authService.updateProfile(user).pipe(
          map(updatedUser => AuthActions.updateProfileSuccess({ user: updatedUser })),
          catchError(error => of(AuthActions.updateProfileFailure({
            error: error.error?.message || 'Errore aggiornamento profilo'
          })))
        )
      )
    )
  );
}