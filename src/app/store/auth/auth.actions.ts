import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user-model';

export const LOGIN_KEY = '[Auth] Login';
export const LOGIN_SUCCESS_KEY = '[Auth] Login Success';
export const LOGIN_FAILURE_KEY = '[Auth] Login Failure';

export const login = createAction(
  LOGIN_KEY,
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS_KEY,
  props<{ user: User; accessToken: string; refreshToken: string }>()
);

export const loginFailure = createAction(
  LOGIN_FAILURE_KEY,
  props<{ error: string }>()
);

export const register = createAction(
  '[Auth] Register',
  props<{ name: string; surname: string; username: string; email: string; password: string }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ user: User; accessToken: string; refreshToken: string }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const loadProfile = createAction('[Auth] Load Profile');

export const loadProfileSuccess = createAction(
  '[Auth] Load Profile Success',
  props<{ user: User }>()
);

export const loadProfileFailure = createAction(
  '[Auth] Load Profile Failure',
  props<{ error: string }>()
);

export const updateProfile = createAction(
  '[Auth] Update Profile',
  props<{ user: Partial<User> }>()
);

export const updateProfileSuccess = createAction(
  '[Auth] Update Profile Success',
  props<{ user: User }>()
);

export const updateProfileFailure = createAction(
  '[Auth] Update Profile Failure',
  props<{ error: string }>()
);

export const clearAuthError = createAction('[Auth] Clear Error');