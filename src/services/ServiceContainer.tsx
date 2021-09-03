type constructor<T> = {
    new(...args: any[]): T;
};

export class ServiceContainer {
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