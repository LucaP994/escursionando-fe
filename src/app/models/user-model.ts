import { Gender } from "./gender";

export class User{
    name:string;
    surname:string;
    gender: Gender
    username: string;
    email: string;
    userImage: string;
    accessToken: string;
    walkedDistance: number;
    tripNumber: number;
    lastTrip: string;
    level: number;
}