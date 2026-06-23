import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UiState } from './ui.reducer';

export const selectUiState = createFeatureSelector<UiState>('ui');

export const selectTheme = createSelector(
  selectUiState,
  (state) => state.theme
);

export const selectUnitSystem = createSelector(
  selectUiState,
  (state) => state.unitSystem
);

export const selectUiLoading = createSelector(
  selectUiState,
  (state) => state.isLoading
);

export const selectToastMessage = createSelector(
  selectUiState,
  (state) => state.toastMessage
);

export const selectToastType = createSelector(
  selectUiState,
  (state) => state.toastType
);