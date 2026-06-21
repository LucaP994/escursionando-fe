import { Coordinates } from "./coordinates-model";

export interface TrackPoint {
  lat: number;
  lon: number;
  elevation: number;
  timestamp: string;
  order: number;
}

export interface TrackPhoto {
  url: string;
  thumbnailUrl: string;
  caption: string;
  order: number;
}

export class Track {
  id: string = '';
  title: string = '';
  location: string = '';
  description: string = '';
  difficulty: number = 0; // 1-10
  distance: number = 0; // km
  elevation: number = 0; // m
  duration: number = 0; // minutes
  imageUrl: string = '';
  photos: TrackPhoto[] = [];
  trackPoints: TrackPoint[] = [];
  coords: Coordinates = new Coordinates();
  userId: string = '';
  userName: string = '';
  userImage: string = '';
  likesCount: number = 0;
  commentsCount: number = 0;
  isLiked: boolean = false;
  createdAt: string = '';
}