import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { SessionContext } from "../models/sessionContextModel";
import { ConfigurationConstants } from "./configuration-constants";
import { Geolocation } from "@capacitor/geolocation";

@Injectable({
    providedIn: 'root'
})
export class AppContext {
    public onSessionContextChanged: Subject<SessionContext> = new Subject<SessionContext>();
    public sessionContext: SessionContext = new SessionContext();
    constructor() { }

    get context(): SessionContext {
        return this.sessionContext;
    }

    public initialize(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.sessionContext = this.get<SessionContext>(ConfigurationConstants.SESSION_CONTEXT) ?? new SessionContext();
            const coordinates = Geolocation.getCurrentPosition().then(res => {
                let coords = { "lat": res.coords.latitude, "lon": res.coords.longitude }
                let newDate: Date = new Date();
                this.sessionContext.position = coords;
                this.sessionContext.today = newDate;
                this.set(ConfigurationConstants.SESSION_CONTEXT, this.sessionContext);
            });
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