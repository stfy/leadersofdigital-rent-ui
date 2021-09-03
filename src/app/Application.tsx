import {http} from "../core/transport/http";
import {AuthService, RefreshTokenGrant} from "../services/AuthService";
import {service} from "../core/decorators/service";
import {action, makeAutoObservable} from "mobx";
import {sc} from "../services/service-container";
import {ENDPOINTS} from "../services/api/endpoints";

@service
export class AirportApplication implements IBootstrapper {

    constructor(private authService: AuthService = sc.get(AuthService)) {
        makeAutoObservable(this)
    }

    onBootstrap() {
        this.addHttpAuthMiddleware();
        this.checkAuth();
    }

    addHttpAuthMiddleware() {
        http.use(async (req) => {
            if (req.path.startsWith(ENDPOINTS.OAuth.token)) {
                return req
            }

            if (!this.authService.token) {
                return Promise.reject('no auth token provided')
            }

            req.headers.set('Authorization', `Bearer ${this.authService.token}`)

            return req;
        })
    }

    @action
    async checkAuth() {
        if (!this.authService.refreshToken) {
            this.authService.status = 'guest'
            this.authService.authStatus = 'success'

            return
        }

        try {
            await this.authService.authenticate(new RefreshTokenGrant(this.authService.refreshToken))
            this.authService.authStatus = 'success'
        } catch (e) {
            this.authService.authStatus = 'error'
        }
    }


}

interface IBootstrapper {
    onBootstrap(): void;
}
