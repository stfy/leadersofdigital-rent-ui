import * as React from 'react';
import {AuthGuard} from "../core/guards/auth-guard";
import {observer} from "mobx-react";
import {Redirect, Route, Switch} from "react-router-dom";
import {LoginPage} from "../pages/Auth/LoginPage";
import {AuthorizedContainer} from "../components/AuthorizedContainer";
import {LoginContainer} from "../components/LoginContainer";
import {LandlordDashboard} from "../pages/Landlord/LandlordDashboard";
import {TenantLandlordView} from "../pages/Tenant/TenantLandlordView";
import {TenantView} from "../pages/Tenant/TenantView";

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
                            <Route path={"/renters"}>
                                {({match}) => {
                                    return (
                                        <Switch>
                                            <Route path={match.path + '/:id'} component={TenantView}/>
                                            <Route path={match.path} exact component={LandlordDashboard}/>
                                        </Switch>
                                    )
                                }}
                            </Route>

                            <Redirect to={'/renters'}/>
                        </Switch>
                    </AuthorizedContainer>
                )
            }}
        </AuthGuard>
    )
})


