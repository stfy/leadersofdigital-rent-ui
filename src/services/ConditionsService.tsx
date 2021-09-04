import {action, observable} from "mobx";
import {ServiceContainer} from "./ServiceContainer";
import {http} from "../core/transport/http";
import {ENDPOINTS} from "./api/endpoints";
import {IUserInfo} from "./ProfileService";
import {RentList} from "./RentList";


export class ConditionsService {
    listService: RentList;

    @observable requestStatus: 'initial' | 'pending' | 'success' | 'error' = 'initial'
    @observable info: IUserInfo;
    @observable error: any;

    constructor(sc: ServiceContainer) {
        this.listService = sc.get(RentList);
    }

    @action
    public enterCreditConditions(id: string, conditions: any) {
        http.post(ENDPOINTS.Api.enterCreditConditions.replace('{id}', id), conditions)
            .then(() => {
                this.listService.updateList()
            })
    }

    @action
    public acceptConditions(id: string, conditions: any) {
        http.post(ENDPOINTS.Api.accept.replace('{id}', id), conditions)
            .then(() => {
                this.listService.updateList()
            })
    }
}