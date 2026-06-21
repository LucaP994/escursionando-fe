import { createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Track } from '../../models/track-model';
import { Comment } from '../../models/comment-model';
import * as TracksActions from './tracks.actions';

export interface TracksState extends EntityState<Track> {
  selectedTrackId: string | null;
  comments: Comment[];
  loading: boolean;
  error: string | null;
  search: string;
  difficultyFilter: number | null;
  sortBy: string;
}

export const adapter = createEntityAdapter<Track>({
  selectId: (track: Track) => track.id,
  sortComparer: false,
});

export const initialState: TracksState = adapter.getInitialState({
  selectedTrackId: null as string | null,
  comments: [] as Comment[],
  loading: false,
  error: null as string | null,
  search: '',
  difficultyFilter: null,
  sortBy: 'recent',
});

export const tracksReducer = createReducer(
  initialState,

  on(TracksActions.loadTracks, (state): TracksState => ({
    ...state,
    loading: true,
    error: null as string | null,
  })),

  on(TracksActions.loadTracksSuccess, (state, { tracks }): TracksState =>
    adapter.setAll(tracks, { ...state, loading: false, error: null as string | null })
  ),

  on(TracksActions.loadTracksFailure, (state, { error }): TracksState => ({
    ...state,
    loading: false,
    error,
  })),

  on(TracksActions.selectTrack, (state, { trackId }): TracksState => ({
    ...state,
    selectedTrackId: trackId,
  })),

  on(TracksActions.setTrackSearch, (state, { search }): TracksState => ({
    ...state,
    search,
  })),

  on(TracksActions.setTrackFilter, (state, { difficulty, sortBy }): TracksState => ({
    ...state,
    difficultyFilter: difficulty,
    sortBy,
  })),

  on(TracksActions.loadCommentsSuccess, (state, { comments }): TracksState => ({
    ...state,
    comments,
  })),

  on(TracksActions.addCommentSuccess, (state, { comment }): TracksState => ({
    ...state,
    comments: [...state.comments, comment],
  })),

  on(TracksActions.likeTrackSuccess, (state, { trackId, isLiked }): TracksState =>
    adapter.updateOne(
      {
        id: trackId,
        changes: {
          isLiked,
          likesCount: (state.entities[trackId]?.likesCount ?? 0) + (isLiked ? 1 : -1),
        },
      },
      state
    ) as TracksState
  )
);

// Selectors
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