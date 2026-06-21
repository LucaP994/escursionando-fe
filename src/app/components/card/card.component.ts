import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Track } from '../../models/track-model';
import { Coordinates } from '../../models/coordinates-model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: false
})
export class CardComponent implements OnInit {
  @Input() track: Track = new Track();
  public distance: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    try {
      const context = JSON.parse(localStorage.getItem('session-context') || '{}');
      if (context.position) {
        this.distance = this.calcDistance(
          { lat: context.position.lat, lon: context.position.lon, height: 0 },
          this.track.coords
        );
      }
    } catch (e) {
      // Default distance if position unavailable
    }
  }

  calcDistance(to: Coordinates, from: Coordinates): number {
    const dist = Math.sqrt(Math.pow((from.lat - to.lat), 2) + Math.pow((from.lon - to.lon), 2)) * 100;
    return parseFloat(dist.toFixed(2));
  }

  goToDetail() {
    this.router.navigate(['/track', this.track.id]);
  }

  getDifficultyLabel(diff: number): string {
    if (diff <= 3) return 'Facile';
    if (diff <= 6) return 'Media';
    if (diff <= 8) return 'Difficile';
    return 'Estrema';
  }
}