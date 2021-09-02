import {AuthService, PersistentStorage} from "./AuthService";
import {AirportApplication} from "../app/Application";

type constructor<T> = {
    new(...args: any[]): T;
};

class ServiceContainer {
    container: Map<string, any>;

    constructor() {
        this.container = new Map<string, any>();
    }

    set(instance: any) {
        this.container.set(`root/${instance.constructor.name}`, instance)
    }

    get<T>(constructor: constructor<T>): T {
        return this.container.get(`root/${constructor.name}`)
    }
}

export const sc = new ServiceContainer()

sc.set(new AuthService(new PersistentStorage()))
sc.set(new AirportApplication())
