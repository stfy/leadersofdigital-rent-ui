import {ServiceContainer} from "./ServiceContainer";
import {action, makeAutoObservable, observable} from "mobx";
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
        "paymentAmount": number
    },
    "creditDebt": number,
    "events": [
        {
            "amount": number,
            "creditPart": number,
            "date": string,
            "debtPart": number,
            "earning": number,
            "id": string,
            "type": string
        }
    ],
    "id": string,
    "status": "NEW",
    "tenantAddress": string,
    "tenantName": string,
    "tenantUUID": string,
    "totalDebt": number,
    "totalEarnings": number
}


export class RentList {
    @observable requestStatus: 'initial' | 'pending' | 'success' | 'error' = 'initial'
    @observable error: any;
    @observable list: IRent[] = [];

    constructor(sc: ServiceContainer) {
        makeAutoObservable(this);
    }

    @action
    getList() {
        this.requestStatus = 'pending';

        return http.get<IRent[]>(ENDPOINTS.Api.list)
            .then(list => {
                this.list = list;
                this.requestStatus = 'success'
            })
            .catch((e) => {
                this.error = e;
                this.requestStatus = 'error'
            })
    }
}