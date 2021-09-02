import * as React from "react";
import {WithSubnavigation} from "./Navbar/Navbar";
import {Box, Flex, useColorModeValue} from "@chakra-ui/react";
import {observer} from "mobx-react";


export const AuthorizedContainer = observer(function AuthorizedContainer(props: React.PropsWithChildren<{  }>) {
    const {children} = props


    return (
        <Box w="100%">
            <WithSubnavigation/>

            <Flex
                minH={'100vh'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>{children}</Flex>
        </Box>
    )
})


