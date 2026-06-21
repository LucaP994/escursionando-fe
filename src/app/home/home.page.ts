import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Track } from '../models/track-model';
import { AppState } from '../store/app.state';
import * as TracksActions from '../store/tracks/tracks.actions';
import { selectAllTracks, selectTracksLoading } from '../store/tracks/tracks.reducer';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  tracks$: Observable<Track[]>;
  loading$: Observable<boolean>;
  isAuthenticated$: Observable<boolean>;
  searchQuery = '';

  constructor(private store: Store<AppState>) {
    this.tracks$ = this.store.select(selectAllTracks);
    this.loading$ = this.store.select(selectTracksLoading);
    this.isAuthenticated$ = this.store.select(s => s.auth.isAuthenticated);
  }

  ngOnInit() {
    this.store.dispatch(TracksActions.loadTracks());
  }

  onSearch() {
    this.store.dispatch(TracksActions.setTrackSearch({ search: this.searchQuery }));
  }
}