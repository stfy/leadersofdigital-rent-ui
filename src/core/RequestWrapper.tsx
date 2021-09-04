import {makeAutoObservable, observable} from "mobx";

export class RequestWrapper<F = any> {
    @observable requestStatus: 'initial' | 'pending' | 'success' | 'error' = 'initial'




    constructor(fn: () => Promise<F>) {
        makeAutoObservable(this)


        fn().then()
    }
}