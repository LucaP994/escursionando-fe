import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducer';
import { tracksReducer, TracksState } from './tracks/tracks.reducer';
import { uiReducer, UiState } from './ui/ui.reducer';

export interface AppState {
  auth: AuthState;
  tracks: TracksState;
  ui: UiState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  tracks: tracksReducer,
  ui: uiReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [];