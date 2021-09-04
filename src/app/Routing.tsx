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
import {useService} from "../core/decorators/service";
import {ProfileService} from "../services/ProfileService";

export const Routing = observer(function Routing() {
    const profileService = useService(ProfileService)

    const isLandlord = profileService.rolesInclude('LANDLORD')
    const isTenant = profileService.rolesInclude('TENANT')
    const isBank = profileService.rolesInclude('BANK')

    const landlordRoutes = (
        <Switch>
            <Route path={"/renters"}>
                {({match}) => {
                    return (
                        <Switch>
                            <Route path={match.path + '/:id'} component={TenantLandlordView}/>
                            <Route path={match.path} exact component={LandlordDashboard}/>
                        </Switch>
                    )
                }}
            </Route>

            <Redirect to={'/renters'}/>
        </Switch>
    );

    const tenantRoutes = (
        <Switch>
            <Route path={'/dashboard'} component={TenantView}/>
            <Redirect to={'/dashboard'}/>
        </Switch>
    )

    const bankRoutes = (
        <Switch>
            <Route path={'/dashboard'} render={() => 'Bank screen'}/>
            <Redirect to={'/dashboard'}/>
        </Switch>
    )


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
                        {isTenant && tenantRoutes}
                        {isLandlord && landlordRoutes}
                        {isBank && bankRoutes}
                    </AuthorizedContainer>
                )
            }}
        </AuthGuard>
    )
})


