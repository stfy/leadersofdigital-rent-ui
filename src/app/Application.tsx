import {http} from "../core/transport/http";
import {AuthService, RefreshTokenGrant} from "../services/AuthService";
import {service} from "../core/decorators/service";
import {action, makeAutoObservable} from "mobx";
import {sc} from "../services/service-container";

interface IBootstrapper {
    onBootstrap(): void;
}

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
            if (req.path.startsWith('/token')) {
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
    checkAuth() {
        if (!this.authService.refreshToken) {
            this.authService.status = 'guest'

            return
        }

        this.authService.authenticate(new RefreshTokenGrant(this.authService.refreshToken))
    }
}