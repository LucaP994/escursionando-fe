import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TracksState, adapter } from './tracks.reducer';

export const selectTracksState = createFeatureSelector<TracksState>('tracks');

export const { selectAll: selectAllTracks, selectEntities: selectTrackEntities } = adapter.getSelectors(selectTracksState);

export const selectTracksLoading = createSelector(
  selectTracksState,
  (state) => state.loading
);

export const selectSelectedTrackId = createSelector(
  selectTracksState,
  (state) => state.selectedTrackId
);

export const selectSelectedTrack = createSelector(
  selectTrackEntities,
  selectSelectedTrackId,
  (entities, selectedId) => selectedId ? entities[selectedId] ?? null : null
);

export const selectTrackComments = createSelector(
  selectTracksState,
  (state) => state.comments
);

export const selectTrackSearch = createSelector(
  selectTracksState,
  (state) => state.search
);