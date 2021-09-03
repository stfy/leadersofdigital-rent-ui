import * as React from 'react';
import {ReactNode} from 'react';
import {AuthService, AuthStatus} from "../../services/AuthService";
import {useService} from "../decorators/service";
import {observer} from "mobx-react";

type AuthGuardProps = {
    fn: (status: AuthStatus) => boolean
    children: (authorized: boolean) => ReactNode | undefined
}


export const AuthGuard = observer(
    function AuthGuard(props: React.PropsWithChildren<AuthGuardProps>) {
        const {fn: authorize, children: renderChildren} = props;

        const auth = useService(AuthService)
        const authorized = auth.isAuthorized

        if (auth.authStatus === 'initial' || auth.authStatus === 'pending') {
            return null;
        }

        return <>{renderChildren(authorized)}</>
    }
)

