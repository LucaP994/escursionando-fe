import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { TrackService } from '../../services/track.service';
import { AppState } from '../app.state';
import * as TracksActions from './tracks.actions';

@Injectable()
export class TracksEffects {
  constructor(
    private actions$: Actions,
    private trackService: TrackService,
    private store: Store<AppState>
  ) {}

  loadTracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TracksActions.loadTracks),
      withLatestFrom(this.store.select(s => s.tracks.search)),
      switchMap(([_, search]) =>
        this.trackService.getTracks(search).pipe(
          map(tracks => TracksActions.loadTracksSuccess({ tracks })),
          catchError(error => of(TracksActions.loadTracksFailure({
            error: error.error?.message || 'Errore caricamento percorsi'
          })))
        )
      )
    )
  );

  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TracksActions.loadComments),
      switchMap(({ trackId }) =>
        this.trackService.getComments(trackId).pipe(
          map(comments => TracksActions.loadCommentsSuccess({ comments })),
          catchError(() => of(TracksActions.loadCommentsSuccess({ comments: [] })))
        )
      )
    )
  );

  addComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TracksActions.addComment),
      switchMap(({ trackId, text, parentCommentId }) =>
        this.trackService.addComment(trackId, text, parentCommentId).pipe(
          map(comment => TracksActions.addCommentSuccess({ comment })),
          catchError(() => of({ type: '[Tracks] Add Comment Failure' }))
        )
      )
    )
  );

  likeTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TracksActions.likeTrack),
      switchMap(({ trackId }) =>
        this.trackService.likeTrack(trackId).pipe(
          map(response => TracksActions.likeTrackSuccess({
            trackId,
            isLiked: response.isLiked
          })),
          catchError(() => of({ type: '[Tracks] Like Track Failure' }))
        )
      )
    )
  );
}