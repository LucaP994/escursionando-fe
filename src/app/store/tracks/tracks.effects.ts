import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { TrackService } from '../../services/track.service';
import { AppState } from '../app.state';
import * as TracksActions from './tracks.actions';

@Injectable()
export class TracksEffects {
  private actions$ = inject(Actions);
  private trackService = inject(TrackService);
  private store = inject(Store<AppState>);
  private router = inject(Router);

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

  createTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TracksActions.createTrack),
      switchMap(({ trackData }) =>
        this.trackService.createTrack(trackData).pipe(
          map(track => TracksActions.createTrackSuccess({ track })),
          catchError(error => of(TracksActions.createTrackFailure({
            error: error.error?.message || 'Errore creazione percorso'
          })))
        )
      )
    )
  );

  createTrackSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TracksActions.createTrackSuccess),
      tap(() => this.router.navigate(['/home']))
    ),
    { dispatch: false }
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