import {ServiceContainer} from "./ServiceContainer";
import {action, computed, makeAutoObservable, observable} from "mobx";
import {http} from "../core/transport/http";
import {ENDPOINTS} from "./api/endpoints";

export type IRent = {
    "bankAddress": string,
    "bankName": string,
    "bankUUID": string,
    "conditions": {
        "conditionsId": string,
        "date": string,
        "earningCreditPercent": number,
        "earningPercent": number,
        "endDate": string,
        "interestRate": number,
        "limit": number,
        "paymentAmount": number,
        concessionPercent: number,
        minGuaranteedConcession: number
    },
    "creditDebt": number,
    concessionDebt: number,
    "events": {
        "amount": number,
        "creditPart": number,
        "date": string,
        "debtPart": number,
        "earning": number,
        "id": string,
        "type": string,
        "concessionPart": number
    }[],
    "id": string,
    "status": "NEW" | 'BANK_PROPOSED' | 'ACCEPTED',
    "tenantAddress": string,
    "tenantName": string,
    "tenantUUID": string,
    "totalDebt": number,
    "totalEarnings": number
}


function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function preprocessList(list: any[]): any[] {
    function processObject(i: object) {
        let res = {};

        Object.keys(i)
            .map(key => {
                if (typeof i[key] === 'number') {
                    res[key] = numberWithSpaces(numberWithSpaces(Math.round(i[key])))
                    return;
                }

                if (Array.isArray(i[key])) {
                    res[key] = preprocessList(i[key])
                    return;
                }

                if (typeof i[key] === 'object') {
                    res[key] = processObject(i[key])
                    return;
                }

                res[key] = i[key];
            })

        return res;
    }

    return list.map(i => processObject(i))
}

export class RentList {
    @observable requestStatus: 'initial' | 'pending' | 'success' | 'error' = 'initial'
    @observable error: any;

    @observable list: IRent[] = [];
    @observable originalList: IRent[] = [];

    constructor(sc: ServiceContainer) {
        makeAutoObservable(this);
    }

    @action
    getList() {
        this.requestStatus = 'pending';

        return http.get<IRent[]>(ENDPOINTS.Api.list)
            .then(list => {
                this.list = preprocessList(list);

                this.originalList = list;
                this.requestStatus = 'success'
            })
            .catch((e) => {
                this.error = e;
                this.requestStatus = 'error'
            })
    }

    @action
    updateList() {
        return http.get<IRent[]>(ENDPOINTS.Api.list)
            .then(list => {
                this.list = preprocessList(list);
                this.originalList = list;

                this.requestStatus = 'success'
            })
            .catch((e) => {
                this.error = e;
                this.requestStatus = 'error'
            })
    }
}