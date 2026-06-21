import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as L from 'leaflet';
import { AppState } from '../../store/app.state';
import * as TracksActions from '../../store/tracks/tracks.actions';
import { selectSelectedTrack, selectTrackComments } from '../../store/tracks/tracks.reducer';
import { Track } from '../../models/track-model';
import { Comment } from '../../models/comment-model';

@Component({
  selector: 'app-track-detail',
  templateUrl: './track-detail.page.html',
  styleUrls: ['./track-detail.page.scss'],
  standalone: false
})
export class TrackDetailPage implements OnInit {
  track$: Observable<Track | null>;
  comments$: Observable<Comment[]>;
  newComment = '';
  private map: L.Map | null = null;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.track$ = this.store.select(selectSelectedTrack);
    this.comments$ = this.store.select(selectTrackComments);
  }

  ngOnInit() {
    const trackId = this.route.snapshot.paramMap.get('id');
    if (trackId) {
      this.store.dispatch(TracksActions.selectTrack({ trackId }));
      this.store.dispatch(TracksActions.loadComments({ trackId }));
    }
  }

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap() {
    if (this.map) return;
    this.map = L.map('detail-map', {
      center: [41.9, 12.5],
      zoom: 8,
      zoomControl: true
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 19
    }).addTo(this.map);
    setTimeout(() => this.map?.invalidateSize(), 300);
  }

  private updateMap(track: Track) {
    if (!this.map) return;
    
    const lat = track.coords?.lat || 0;
    const lon = track.coords?.lon || 0;
    
    if (lat && lon) {
      this.map.setView([lat, lon], 13);
      
      L.marker([lat, lon]).addTo(this.map)
        .bindPopup(`<b>${track.title}</b><br/>${track.location || ''}`)
        .openPopup();
    }

    // Draw track polyline if trackPoints exist
    if (track.trackPoints?.length > 1) {
      const points: [number, number][] = track.trackPoints
        .sort((a, b) => a.order - b.order)
        .map(p => [p.lat, p.lon]);
      
      L.polyline(points, {
        color: '#3880ff',
        weight: 4,
        opacity: 0.8
      }).addTo(this.map);

      this.map.fitBounds(points, { padding: [50, 50] });
    }
  }

  getDifficultyLabel(diff: number): string {
    if (diff <= 3) return 'Facile';
    if (diff <= 6) return 'Media';
    if (diff <= 8) return 'Difficile';
    return 'Estrema';
  }

  getDifficultyColor(diff: number): string {
    if (diff <= 3) return 'success';
    if (diff <= 6) return 'warning';
    return 'danger';
  }

  likeTrack(trackId: string) {
    this.store.dispatch(TracksActions.likeTrack({ trackId }));
  }

  addComment(trackId: string) {
    if (this.newComment.trim()) {
      this.store.dispatch(TracksActions.addComment({ trackId, text: this.newComment }));
      this.newComment = '';
    }
  }
}