import React from 'react'
import {BrowserRouter} from "react-router-dom"

import {ChakraProvider} from "@chakra-ui/react";

import './App.css'
import {useProviders} from "./app/useProviders";
import {Routing} from "./app/Routing";
import {useService} from "./core/decorators/service";
import {AirportApplication} from "./app/Application";

function App() {
    const [RootProvider] = useProviders([
        <ChakraProvider resetCSS={true}/>,
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
