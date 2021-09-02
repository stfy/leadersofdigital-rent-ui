import {container, injectable, Lifecycle} from "tsyringe";
import React from "react";
import {makeAutoObservable} from "mobx";
import {sc} from "../../services/service-container";

type constructor<T> = {
    new(...args: any[]): T;
};

// const ROOT_CONTEXT = 'root'

function injectionToken(identifier: string): symbol {
    return Symbol(identifier)
}

function provideService(token: symbol, targetService: any) {
    Reflect.defineMetadata('core:service:token', token, targetService)

    container.register(token, targetService, {
        lifecycle: Lifecycle.Singleton
    })

    container.afterResolution(
        token,
        (_, res: any) => {
            makeAutoObservable(res);
        },
        {frequency: 'Once'}
    )
}


export function service(...args: any): any {
    let context = 'root'

    if (typeof args[0] === 'string') {
        context = args[0]

        return (target: constructor<any>) => {
            injectable()(target)
            provideService(injectionToken(`${context}/${target.name}`), target)
        }
    }

    // TODO: asserts
    const target = args[0] as constructor<any>

    injectable()(target)
    provideService(injectionToken(`${context}/${target.name}`), target)
}


export function useService<T>(target: constructor<T>): T {
    const [service] = React.useState(sc.get(target))

    return service;
}