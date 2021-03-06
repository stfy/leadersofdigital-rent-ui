import {AuthService, PersistentStorage} from "./AuthService";
import {AirportApplication} from "../app/Application";
import {ServiceContainer} from "./ServiceContainer";
import {ProfileService} from "./ProfileService";
import {RentList} from "./RentList";
import {ConditionsService} from "./ConditionsService";

export const sc = new ServiceContainer()

sc.set(new AuthService(new PersistentStorage()))
sc.set(new AirportApplication())
sc.set(new ProfileService(sc))
sc.set(new RentList(sc))
sc.set(new ConditionsService(sc))
