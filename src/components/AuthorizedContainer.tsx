import * as React from "react";
import {Navigation} from "./Navbar/Navbar";
import {Box, Flex, useColorModeValue} from "@chakra-ui/react";
import {observer} from "mobx-react";


export const AuthorizedContainer = observer(function AuthorizedContainer(props: React.PropsWithChildren<{  }>) {
    const {children} = props


    return (
        <Box w="100%" justifyContent={'center'}>
            <Navigation/>

            <Flex justify={'center'}>
                <Flex

                    maxW={'container.lg'}
                    minH={'100vh'}
                    justify={'center'}
                    grow={1}
                >{children}</Flex>
            </Flex>
        </Box>
    )
})


