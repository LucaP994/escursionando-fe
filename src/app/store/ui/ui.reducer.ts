import { createReducer, on, createAction, props } from '@ngrx/store';

export interface UiState {
  theme: 'light' | 'dark' | 'system';
  unitSystem: 'metric' | 'imperial';
  isLoading: boolean;
  toastMessage: string | null;
  toastType: 'success' | 'error' | 'info' | null;
}

export const setTheme = createAction(
  '[UI] Set Theme',
  props<{ theme: 'light' | 'dark' | 'system' }>()
);

export const setUnitSystem = createAction(
  '[UI] Set Unit System',
  props<{ unitSystem: 'metric' | 'imperial' }>()
);

export const showToast = createAction(
  '[UI] Show Toast',
  props<{ message: string; severity: 'success' | 'error' | 'info' }>()
);

export const hideToast = createAction('[UI] Hide Toast');

export const setLoading = createAction(
  '[UI] Set Loading',
  props<{ isLoading: boolean }>()
);

const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
const savedUnit = localStorage.getItem('unitSystem') as 'metric' | 'imperial' | null;

export const initialUiState: UiState = {
  theme: savedTheme || 'system',
  unitSystem: savedUnit || 'metric',
  isLoading: false,
  toastMessage: null as string | null,
  toastType: null as 'success' | 'error' | 'info' | null,
};

export const uiReducer = createReducer(
  initialUiState,

  on(setTheme, (state, { theme }) => {
    localStorage.setItem('theme', theme);
    return { ...state, theme };
  }),

  on(setUnitSystem, (state, { unitSystem }) => {
    localStorage.setItem('unitSystem', unitSystem);
    return { ...state, unitSystem };
  }),

  on(showToast, (state, { message, severity }) => ({
    ...state,
    toastMessage: message,
    toastType: severity as 'success' | 'error' | 'info',
  })),

  on(hideToast, (state) => ({
    ...state,
    toastMessage: null as string | null,
    toastType: null as 'success' | 'error' | 'info' | null,
  })),

  on(setLoading, (state, { isLoading }) => ({
    ...state,
    isLoading,
  }))
);