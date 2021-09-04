import * as React from 'react'
import {observer} from "mobx-react";
import {Box, Flex} from "@chakra-ui/react";

import {Logo} from './Logo';

export const LoginContainer = observer(function AuthorizedContainer(props: React.PropsWithChildren<{}>) {
    const {children} = props


    return (
        <Box w="100%"
             height={'100vh'} position={'relative'}>
            <Box
                position={'absolute'}
                w="100%"
                height={'100vh'}
                bg={'#06111A'}
                opacity={'0.4'}
            />

            <Box w="100%"
                 height={'100vh'}
                 bg={'url(\'/login_bg.png\')'}
                 backgroundSize={'cover'}
            />


            <Box position={'absolute'} top={'0'} width={'100%'} height={'100%'}>
                <Flex width={'100%'} justifyContent={'center'} mt={10} mb={10}>
                    <Logo/>
                </Flex>

                {children}
            </Box>
        </Box>
    )
})
