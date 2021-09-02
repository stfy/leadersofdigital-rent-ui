import * as React from 'react';
import {AuthGuard} from "../core/guards/auth-guard";
import {observer} from "mobx-react";
import {Redirect, Route, Switch} from "react-router-dom";
import {LoginPage} from "../pages/Auth/LoginPage";
import {AuthorizedContainer} from "../components/AuthorizedContainer";
import {LoginContainer} from "../components/LoginContainer";

export const Routing = observer(function Routing() {
    return (
        <AuthGuard fn={(s) => s === 'authenticated'}>
            {(authenticated) => {
                if (!authenticated) {
                    return (
                        <LoginContainer>
                            <Switch>
                                <Route path={"/login"} component={LoginPage}/>

                                <Redirect to={'/login'}/>
                            </Switch>
                        </LoginContainer>
                    )
                }

                return (
                    <AuthorizedContainer>
                        <Switch>
                            <Route path={"/dashboard"} render={() => 'dashboard'}/>

                            <Redirect to={'/dashboard'}/>
                        </Switch>
                    </AuthorizedContainer>
                )
            }}
        </AuthGuard>
    )
})


