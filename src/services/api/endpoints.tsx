const OAuth = {
    token: '/api/v0/vst-oauth2/oauth/token'
}

const Identity = {
    userInfo: '/api/v0/vst-identity/persons/info',

}

const Api = {
    list: '/api/v0/rent-app/rent',
    enterCreditConditions: '/api/v0/rent-app/rent/{id}/enterCreditConditions',
    accept: '/api/v0/rent-app/rent/{id}/acceptCreditConditions',

    observeTx: '/api/v0/rent-app/rent/tx/{id}/status'
}

export const ENDPOINTS = {
    OAuth,
    Identity,
    Api
}