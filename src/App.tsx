import './fonts/stylesheet.css'

import React from 'react'
import {BrowserRouter} from "react-router-dom"

import {ChakraProvider, extendTheme} from "@chakra-ui/react";

import './App.css'
import {useProviders} from "./app/useProviders";
import {Routing} from "./app/Routing";
import {useService} from "./core/decorators/service";
import {AirportApplication} from "./app/Application";
import {AirportTheme} from "./app/Theme";

const theme = extendTheme(AirportTheme)

console.log(theme);

function App() {
    const [RootProvider] = useProviders([
        <ChakraProvider resetCSS={true} theme={theme}/>,
        <BrowserRouter/>
    ])

    const application = useService(AirportApplication)

    React.useEffect(() => application.onBootstrap(), [])

    return (
        <RootProvider>
            <Routing/>
        </RootProvider>
    )
}

export default App
