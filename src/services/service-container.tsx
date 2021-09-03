import {AuthService, PersistentStorage} from "./AuthService";
import {AirportApplication} from "../app/Application";
import {ServiceContainer} from "./ServiceContainer";
import {ProfileService} from "./ProfileService";

type constructor<T> = {
    new(...args: any[]): T;
};

export const sc = new ServiceContainer()

sc.set(new AuthService(new PersistentStorage()))
sc.set(new AirportApplication())
sc.set(new ProfileService(sc))
