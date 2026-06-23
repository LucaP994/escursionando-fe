import { Component, OnInit, ChangeDetectionStrategy, signal, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectIsAuthenticated } from '../../store/auth/auth.selectors';
import * as TracksActions from '../../store/tracks/tracks.actions';

@Component({
  selector: 'app-create-track',
  templateUrl: './create-track.page.html',
  styleUrls: ['./create-track.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateTrackPage implements OnInit {
  private router = inject(Router);
  private store = inject(Store<AppState>);

  isRecording = signal(false);
  isPaused = signal(false);
  title = signal('');
  location = signal('');
  description = signal('');
  difficulty = signal(5);
  distance = signal(0);
  elevation = signal(0);
  duration = signal(0);
  startLat = 0;
  startLon = 0;

  watchId: string | null = null;
  trackPoints: { lat: number; lon: number; elevation: number; order: number }[] = [];
  timerInterval: any;
  seconds = 0;
  lastPosition: { lat: number; lon: number } | null = null;

  private isAuthenticated = this.store.selectSignal(selectIsAuthenticated);

  constructor() {
    effect(() => {
      if (!this.isAuthenticated()) {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {}

  async startRecording() {
    try {
      const pos = await Geolocation.getCurrentPosition();
      this.startLat = pos.coords.latitude;
      this.startLon = pos.coords.longitude;
      this.isRecording.set(true);
      this.isPaused.set(false);
      this.trackPoints = [];
      this.distance.set(0);
      this.elevation.set(0);
      this.seconds = 0;
      this.duration.set(0);
      this.lastPosition = { lat: this.startLat, lon: this.startLon };
      this.timerInterval = setInterval(() => {
        this.seconds++;
        this.duration.set(this.seconds);
      }, 1000);
      this.watchId = await Geolocation.watchPosition({ enableHighAccuracy: true }, (position, err) => {
        if (err || !position) return;
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const alt = position.coords.altitude || 0;
        const order = this.trackPoints.length;
        this.trackPoints.push({ lat, lon, elevation: alt, order });
        if (this.lastPosition) {
          const d = this.calcDistance(this.lastPosition.lat, this.lastPosition.lon, lat, lon);
          this.distance.update(v => v + d);
        }
        if (alt > this.elevation()) this.elevation.set(Math.round(alt));
        this.lastPosition = { lat, lon };
      });
    } catch (e) {
      console.error('Errore GPS:', e);
    }
  }

  pauseRecording() {
    this.isPaused.set(true);
    if (this.timerInterval) clearInterval(this.timerInterval);
    if (this.watchId) Geolocation.clearWatch({ id: this.watchId });
  }

  resumeRecording() {
    this.isPaused.set(false);
    this.startRecording();
  }

  stopRecording() {
    this.isRecording.set(false);
    this.isPaused.set(false);
    if (this.timerInterval) clearInterval(this.timerInterval);
    if (this.watchId) Geolocation.clearWatch({ id: this.watchId });
  }

  saveTrack() {
    if (!this.title()) return;
    this.store.dispatch(TracksActions.createTrack({
      trackData: {
        title: this.title(),
        location: this.location() || 'Posizione corrente',
        description: this.description(),
        difficulty: this.difficulty(),
        distance: parseFloat(this.distance().toFixed(2)),
        elevation: Math.round(this.elevation()),
        duration: this.seconds,
        startLat: this.startLat,
        startLon: this.startLon,
        trackPoints: this.trackPoints
      }
    }));
  }

  calcDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  }

  toRad(deg: number): number { return deg * Math.PI / 180; }

  formatTime(sec: number): string {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h}h ${m}m ${s}s`;
  }
}