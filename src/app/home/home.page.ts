import { Component, OnInit, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Track } from '../models/track-model';
import { AppState } from '../store/app.state';
import * as TracksActions from '../store/tracks/tracks.actions';
import { selectAllTracks, selectTracksLoading } from '../store/tracks/tracks.selectors';
import { selectIsAuthenticated } from '../store/auth/auth.selectors';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit {
  private store = inject(Store<AppState>);

  tracks = this.store.selectSignal(selectAllTracks);
  loading = this.store.selectSignal(selectTracksLoading);
  isAuthenticated = this.store.selectSignal(selectIsAuthenticated);
  searchQuery = signal('');

  ngOnInit() {
    this.store.dispatch(TracksActions.loadTracks());
  }

  onSearch() {
    this.store.dispatch(TracksActions.setTrackSearch({ search: this.searchQuery() }));
  }
}