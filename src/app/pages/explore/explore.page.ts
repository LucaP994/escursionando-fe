import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { AppState } from '../../store/app.state';
import { selectAllTracks } from '../../store/tracks/tracks.reducer';
import { Track } from '../../models/track-model';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
  standalone: false
})
export class ExplorePage implements OnInit {
  private map: L.Map | null = null;
  private markers: L.CircleMarker[] = [];
  
  filterDifficulty: number | null = null;
  filterMaxDistance: number = 50;
  userLat: number = 41.9;
  userLon: number = 12.5;
  tracks: Track[] = [];

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    try {
      const ctx = JSON.parse(localStorage.getItem('session-context') || '{}');
      if (ctx.position) {
        this.userLat = ctx.position.lat;
        this.userLon = ctx.position.lon;
      }
    } catch(e) {}

    this.store.select(selectAllTracks).subscribe(tracks => {
      this.tracks = tracks;
      this.updateMarkers();
    });
  }

  ionViewDidEnter() {
    setTimeout(() => this.initMap(), 100);
  }

  private initMap() {
    if (this.map) return;
    
    this.map = L.map('explore-map', {
      center: [this.userLat, this.userLon],
      zoom: 8,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(this.map);

    // User marker
    L.circleMarker([this.userLat, this.userLon], {
      radius: 8,
      fillColor: '#4285F4',
      color: '#fff',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8
    }).addTo(this.map).bindPopup('La tua posizione');

    this.updateMarkers();
    
    setTimeout(() => this.map?.invalidateSize(), 200);
  }

  private updateMarkers() {
    if (!this.map) return;
    
    // Remove old markers
    this.markers.forEach(m => m.remove());
    this.markers = [];

    const filtered = this.getFilteredTracks();

    filtered.forEach(track => {
      const lat = track.coords?.lat || 0;
      const lon = track.coords?.lon || 0;
      if (!lat && !lon) return;

      const color = track.difficulty <= 3 ? '#48a63e' : track.difficulty <= 6 ? '#dbc03a' : '#e74c3c';
      
      const marker = L.circleMarker([lat, lon], {
        radius: 10,
        fillColor: color,
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(this.map!);

      marker.bindPopup(`
        <b>${track.title}</b><br/>
        <span>📍 ${track.location || ''}</span><br/>
        <span>📏 ${track.distance || '-'} km | 🔥 ${track.difficulty}/10</span><br/>
        <button onclick="window.open('/track/${track.id}', '_self')" style="margin-top:5px;padding:4px 12px;background:#3880ff;color:white;border:none;border-radius:8px;cursor:pointer">
          Vedi dettaglio
        </button>
      `);

      this.markers.push(marker);
    });
  }

  getFilteredTracks(): Track[] {
    return this.tracks.filter(t => {
      if (this.filterDifficulty && t.difficulty !== this.filterDifficulty) return false;
      
      const lat = t.coords?.lat || 0;
      const lon = t.coords?.lon || 0;
      if (lat && lon && this.filterMaxDistance < 999) {
        const dist = this.calcDistance(this.userLat, this.userLon, lat, lon);
        if (dist > this.filterMaxDistance) return false;
      }
      return true;
    });
  }

  onFilterChange() {
    this.updateMarkers();
  }

  private calcDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a = Math.sin(dLat/2) ** 2 + Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * Math.sin(dLon/2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  }

  private toRad(d: number): number { return d * Math.PI / 180; }

  goToTrack(id: string) {
    this.router.navigate(['/track', id]);
  }
}