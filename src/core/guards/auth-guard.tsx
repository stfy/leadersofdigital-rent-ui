import * as React from 'react';
import {ReactNode} from 'react';
import {AuthService, AuthStatus} from "../../services/AuthService";
import {Redirect} from "react-router-dom";
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
        const authorized = authorize(auth.status)


        console.log(auth)


        if (auth.status === 'initial' || auth.status === 'pending') {
            return null
        }

        return <>{renderChildren(authorized)}</>
    }
)

