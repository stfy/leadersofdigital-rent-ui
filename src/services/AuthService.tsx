import {action, makeAutoObservable, observable} from 'mobx'
import {http} from "../core/transport/http";

interface IUser {


}


interface IAuthService {


}

export type AuthStatus = 'initial' | 'guest' | 'authenticated' | 'pending';

interface TokenResponse {
    access: string;
    refresh: string;
}

interface IGrant {
    type: string;

    getBody(): { [key: string]: any, grant_type: string };
}

export class CredentialsGrant implements IGrant {
    public type = 'credentials'

    constructor(private email: string, private password: string) {
    }

    getBody(): any {

        return {
            email: this.email,
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
}

export class AuthService {
    @observable status: AuthStatus = 'initial';

    @observable token: string;
    @observable refreshToken: string;

    constructor(
        private persistentStorage: PersistentStorage
    ) {
        this.refreshToken = this.persistentStorage.getItem('refresh_token')
        this.token = this.persistentStorage.getItem('auth_token')


        makeAutoObservable(this)
    }

    @action
    authenticate(grant: IGrant) {
        this.status = 'pending'

        return http.post<TokenResponse>('/token', grant.getBody())
            .then((resp) => {
                this.status = 'authenticated'

                this.token = resp.access;
                this.refreshToken = resp.refresh;

                this.persistentStorage.setItem('auth_token', resp.access)
                this.persistentStorage.setItem('refresh_token', resp.refresh)
            })
            .catch(() => {
                this.status = 'guest';
            })
    }


    @action
    unauthenticate() {
        this.status = 'guest'
    }
}