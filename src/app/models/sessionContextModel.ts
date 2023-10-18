import { User } from "./user-model";

export class SessionContext {
    position: {lat: number, lon: number} = {lat: 0, lon:0};
    today: Date = new Date();
    user: User = new User();
}