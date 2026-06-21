import { createAction, props } from '@ngrx/store';
import { Track } from '../../models/track-model';
import { Comment } from '../../models/comment-model';

export const loadTracks = createAction('[Tracks] Load Tracks');
export const loadTracksSuccess = createAction(
  '[Tracks] Load Tracks Success',
  props<{ tracks: Track[] }>()
);
export const loadTracksFailure = createAction(
  '[Tracks] Load Tracks Failure',
  props<{ error: string }>()
);

export const selectTrack = createAction(
  '[Tracks] Select Track',
  props<{ trackId: string }>()
);

export const setTrackSearch = createAction(
  '[Tracks] Set Search',
  props<{ search: string }>()
);

export const setTrackFilter = createAction(
  '[Tracks] Set Filter',
  props<{ difficulty: number | null; sortBy: string }>()
);

export const loadComments = createAction(
  '[Tracks] Load Comments',
  props<{ trackId: string }>()
);

export const loadCommentsSuccess = createAction(
  '[Tracks] Load Comments Success',
  props<{ comments: Comment[] }>()
);

export const addComment = createAction(
  '[Tracks] Add Comment',
  props<{ trackId: string; text: string; parentCommentId?: string }>()
);

export const addCommentSuccess = createAction(
  '[Tracks] Add Comment Success',
  props<{ comment: Comment }>()
);

export const likeTrack = createAction(
  '[Tracks] Like Track',
  props<{ trackId: string }>()
);

export const likeTrackSuccess = createAction(
  '[Tracks] Like Track Success',
  props<{ trackId: string; isLiked: boolean }>()
);

export const unlikeTrack = createAction(
  '[Tracks] Unlike Track',
  props<{ trackId: string }>()
);