import * as React from 'react'
import {ReactNode} from 'react'

type IProvider = React.ReactElement;

const RenderChildren: React.FC = ({children}) => {
    return <>{children}</>
}

export function useProviders(providers: IProvider[]): [React.FC] {
    const renderProviders = (children: ReactNode) => {
        return providers
            .reverse()
            .reduce((deep, provider) => {
                return React.cloneElement(provider, provider.props, deep)
            }, <RenderChildren children={children}/>)
    }

    return [
        ({children}) => {
            return <>{renderProviders(children)}</>
        }
    ];
}