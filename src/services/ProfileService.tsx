import {ServiceContainer} from "./ServiceContainer";
import {AuthService} from "./AuthService";
import {action, autorun, computed, makeAutoObservable, observable, reaction} from "mobx";
import {http} from "../core/transport/http";
import {ENDPOINTS} from "./api/endpoints";

interface IUserMeta {

}

type TRole = 'BANK' | 'LANDLORD' | 'TENANT';

export interface IUserInfo {
    accountId: string;
    businessRoles: Array<TRole>;
    companyId: string;
    companyName: string;
    displayName: string;
    email: string | null;
    firstName: string;
    lastName: string;
    nodeAlias: string;
    participantAddress: string | null;
    participantPublicKey: string | null;
    personId: string;
    phone: string;
    meta: IUserMeta | null;
}


export class ProfileService {
    authService: AuthService;

    @observable requestStatus: 'initial' | 'pending' | 'success' | 'error' = 'initial'
    @observable info: IUserInfo;
    @observable error: any;

    constructor(sc: ServiceContainer) {
        this.authService = sc.get(AuthService)

        makeAutoObservable(this)

        autorun( () => {
            switch (this.authService.authStatus) {
                case 'success':
                    this.getUserInfo()
                    break;

                case "error":
                    this.clear();
                    break;
                default:
            }
        })
    }

    @action
    getUserInfo() {
        this.requestStatus = 'pending'

        return http.get<IUserInfo>(ENDPOINTS.Identity.userInfo)
            .then((res) => {
                this.info = res;
                this.requestStatus = 'success'
            })
            .catch((e) => {
                this.error = e;
                this.requestStatus = "error"
            })
    }

    @action
    clear() {
        this.info = null;
        this.error = null;
        this.requestStatus = "initial"
    }

    @computed
    public get roles() {
        console.log(this.info?.businessRoles)

        return this.info?.businessRoles || []
    }

    rolesInclude(role: TRole): boolean {
        return this.roles.includes(role)
    }
}