import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Track } from '../models/track-model';
import { Comment } from '../models/comment-model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TrackService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getTracks(search?: string, difficulty?: number | null, sortBy?: string): Observable<Track[]> {
    let params: any = {};
    if (search) params.search = search;
    if (difficulty) params.difficulty = difficulty;
    if (sortBy) params.sortBy = sortBy;
    return this.http.get<{ content: Track[] }>(`${this.apiUrl}/tracks`, { params }).pipe(
      map(response => response.content || [])
    );
  }

  getTrackById(id: string): Observable<Track> {
    return this.http.get<Track>(`${this.apiUrl}/tracks/${id}`);
  }

  createTrack(track: any, image?: File): Observable<Track> {
    const formData = new FormData();
    formData.append('track', new Blob([JSON.stringify(track)], { type: 'application/json' }));
    if (image) formData.append('image', image);
    return this.http.post<Track>(`${this.apiUrl}/tracks`, formData);
  }

  deleteTrack(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tracks/${id}`);
  }

  getComments(trackId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/tracks/${trackId}/comments`);
  }

  addComment(trackId: string, text: string, parentCommentId?: string): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/tracks/${trackId}/comments`, { text, parentCommentId });
  }

  deleteComment(trackId: string, commentId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tracks/${trackId}/comments/${commentId}`);
  }

  likeTrack(trackId: string): Observable<{ isLiked: boolean; count: number }> {
    return this.http.post<{ isLiked: boolean; count: number }>(`${this.apiUrl}/tracks/${trackId}/like`, {});
  }

  unlikeTrack(trackId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tracks/${trackId}/like`);
  }
}