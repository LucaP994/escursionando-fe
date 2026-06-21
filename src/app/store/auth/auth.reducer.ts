import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user-model';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  isAuthenticated: !!localStorage.getItem('accessToken'),
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.login, (state): AuthState => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.loginSuccess, (state, { user, accessToken, refreshToken }): AuthState => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return {
      ...state,
      user,
      accessToken,
      refreshToken,
      isAuthenticated: true,
      loading: false,
      error: null,
    };
  }),

  on(AuthActions.loginFailure, (state, { error }): AuthState => ({
    ...state,
    loading: false,
    error,
  })),

  on(AuthActions.register, (state): AuthState => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.registerSuccess, (state, { user, accessToken, refreshToken }): AuthState => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return {
      ...state,
      user,
      accessToken,
      refreshToken,
      isAuthenticated: true,
      loading: false,
      error: null,
    };
  }),

  on(AuthActions.registerFailure, (state, { error }): AuthState => ({
    ...state,
    loading: false,
    error,
  })),

  on(AuthActions.logout, (state): AuthState => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('session-context');
    return {
      ...state,
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    };
  }),

  on(AuthActions.loadProfileSuccess, (state, { user }): AuthState => ({
    ...state,
    user,
  })),

  on(AuthActions.updateProfileSuccess, (state, { user }): AuthState => ({
    ...state,
    user,
  })),

  on(AuthActions.clearAuthError, (state): AuthState => ({
    ...state,
    error: null,
  }))
);