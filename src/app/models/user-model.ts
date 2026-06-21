import { Gender } from "./gender";

export class User {
  id: string = '';
  name: string = '';
  surname: string = '';
  gender: Gender = Gender.MALE;
  username: string = '';
  email: string = '';
  bio: string = '';
  userImage: string = '';
  level: number = 1;
  walkedDistance: number = 0;
  elevationGain: number = 0;
  tripNumber: number = 0;
  totalTimeMinutes: number = 0;
  lastTrip: string = '';
  createdAt: string = '';
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}