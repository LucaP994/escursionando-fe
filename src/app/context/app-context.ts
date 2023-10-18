import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { SessionContext } from "../models/sessionContextModel";
import { ConfigurationConstants } from "./configuration-constants";
import { User } from "../models/user-model";
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
    providedIn: 'root'
})
export class AppContext {
    public onSessionContextChanged: Subject<SessionContext> = new Subject<SessionContext>();
    public onLoaded: Subject<boolean> = new Subject<boolean>();
    public sessionContext: SessionContext = new SessionContext();
    constructor() { }

    get context(): SessionContext {
        return this.sessionContext;
    }

    set user(user: User) {
        this.sessionContext.user = user;
        this.set(ConfigurationConstants.SESSION_CONTEXT, this.sessionContext);
    }

    public initialize(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.sessionContext = this.get<SessionContext>(ConfigurationConstants.SESSION_CONTEXT) ?? new SessionContext();
            const printCurrentPosition = async () => {
                const coordinates = await Geolocation.getCurrentPosition();
                this.sessionContext.position.lat = coordinates.coords.latitude;
                this.sessionContext.position.lon = coordinates.coords.longitude;
                let newDate: Date = new Date();
                this.sessionContext.today = newDate;
                console.log(this.sessionContext)
                this.set(ConfigurationConstants.SESSION_CONTEXT, this.sessionContext);
                this.onLoaded.next(true);
            };
            printCurrentPosition();
            resolve();
        })
    }

    private set = (name: string, value: any) => {
        localStorage.setItem(name, JSON.stringify(value));
        switch (name) {
            case ConfigurationConstants.SESSION_CONTEXT:
                this.onSessionContextChanged.next(this.context);
                break
        }
    }

    private get = <T>(name: string): T => JSON.parse(localStorage.getItem(name)) as T;

}