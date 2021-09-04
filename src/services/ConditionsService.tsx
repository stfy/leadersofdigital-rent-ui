import {action, makeAutoObservable, observable} from "mobx";
import {ServiceContainer} from "./ServiceContainer";
import {http} from "../core/transport/http";
import {ENDPOINTS} from "./api/endpoints";
import {IUserInfo} from "./ProfileService";
import {RentList} from "./RentList";

type Tx = {
    txId: string
}

export class Transactional {
    @observable requestStatus: 'initial' | 'pending' | 'success' | 'error' = 'initial';

    @observable result: any;

    public txId: string;

    public timer: number;

    constructor(private fn: (...args: any[]) => Promise<Tx>) {
        makeAutoObservable(this);
    }

    @action
    process(...args: any[]) {
        this.requestStatus = 'pending'

        this.fn(...args)
            .then(({txId}) => {
                this.txId = txId;
                this.poll();
            })
    }

    poll() {
        this.timer = window.setInterval(() => {
            this.txTracker();
        }, 3500);
    }

    done() {
        clearInterval(this.timer);
    }

    @action
    txTracker() {
        return http.get<{ status: string }>(ENDPOINTS.Api.observeTx.replace('{id}', this.txId))
            .then(({status}) => {

                if (status === 'COMPLETE') {
                    this.requestStatus = 'success';

                    this.done();
                }
            })
    }
}


export class ConditionsService {
    listService: RentList;

    @observable requestStatus: 'initial' | 'pending' | 'success' | 'error' = 'initial'
    @observable info: IUserInfo;
    @observable error: any;

    @observable pool = [];

    constructor(sc: ServiceContainer) {
        this.listService = sc.get(RentList);
    }

    @action
    public enterCreditConditions() {
        const tx = new Transactional((id, conditions) => http.post<Tx>(ENDPOINTS.Api.enterCreditConditions.replace('{id}', id), conditions))

        this.pool = [...this.pool, tx]

        return tx;
    }

    @action
    public acceptConditions() {
        const tx = new Transactional((id, conditions) => http.post(ENDPOINTS.Api.accept.replace('{id}', id), conditions))

        this.pool = [...this.pool, tx]

        return tx;
    }
}