import {action, computed, makeAutoObservable, observable} from 'mobx'
import {http} from "../core/transport/http";
import {ENDPOINTS} from "./api/endpoints";

export type AuthStatus = 'guest' | 'authenticated';

export type TToken = {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    jti: string;
};




interface IGrant {
    type: string;
    getBody(): { [key: string]: any, grant_type: string };
}

export class CredentialsGrant implements IGrant {
    public type = 'password'

    constructor(private username: string, private password: string) {
    }

    getBody(): any {

        return {
            username: this.username,
            password: this.password,
            grant_type: this.type
        }
    }
}

export class RefreshTokenGrant implements IGrant {
    public type = 'refresh_token';

    constructor(private refreshToken: string) {
    }

    getBody() {
        return {
            refresh_token: this.refreshToken,
            grant_type: this.type
        }
    }
}

export class PersistentStorage {
    public setItem(key: string, value: any) {
        localStorage.setItem(key, value);
    }

    public getItem(key: string): string {
        return localStorage.getItem(key) as string
    }

    public deleteItem(...keys: string[]) {
        for (const key of keys) {
            localStorage.removeItem(key);
        }
    }
}

export class AuthService {
    @observable status: AuthStatus = 'guest';

    @computed
    public get isAuthorized() {
        return this.status === 'authenticated'
    } ;

    @observable token: string;
    @observable refreshToken: string;

    @observable authStatus: 'initial' | 'pending' | 'success' | 'error' = 'initial'
    @observable requestStatus: 'initial' | 'pending' | 'success' | 'error' = 'initial'

    constructor(
        private persistentStorage: PersistentStorage
    ) {
        this.refreshToken = this.persistentStorage.getItem('refresh_token')
        this.token = this.persistentStorage.getItem('auth_token')

        makeAutoObservable(this)
    }

    @action
    authenticate(grant: IGrant) {
        this.requestStatus = 'pending'

        return http.post<TToken>(ENDPOINTS.OAuth.token, grant.getBody())
            .then((resp) => {
                this.status = 'authenticated'
                this.requestStatus = 'success'

                this.token = resp.access_token;
                this.refreshToken = resp.refresh_token;

                this.persistentStorage.setItem('auth_token', resp.access_token)
                this.persistentStorage.setItem('refresh_token', resp.refresh_token)
            })
            .catch(() => {
                this.status = 'guest';
                this.requestStatus = 'error';
            })

    }

    @action
    unauthenticate() {
        this.status = 'guest'
    }

    @action
    clear() {
        this.token = null;
        this.refreshToken = null;

        this.status = 'guest'
        this.persistentStorage.deleteItem('auth_token', 'refresh_token')
    }
}