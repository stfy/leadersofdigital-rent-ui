import * as React from 'react';
import {observer} from "mobx-react";
import {chakra, Flex, Grid, Heading, Stack} from "@chakra-ui/react";
import {useService} from "../../core/decorators/service";
import {RentList} from "../../services/RentList";
import {RentCard} from "../../components/RentCard";
import {SearchIcon} from "@chakra-ui/icons";
import {Input} from "../../ui/TextInput";

const SearchInput = chakra(Input, {
    baseStyle: {
        paddingInlineStart: '45px',
        border: 0
    }
})


export const BankDashboard = observer(function LandlordDashboard() {
    const rentList = useService(RentList);

    React.useEffect(() => {
        rentList.getList()
    }, [])

    return (
        <Stack as={Flex} width={'100%'} padding={10} spacing={'24px'}>
            <Heading as="h1" size="xl" textAlign={'left'}>Кредитуемых: {rentList.list.length || 0}</Heading>


            <Flex position={'relative'} marginTop={4} marginBottom={4}>
                <SearchIcon __css={{position: 'absolute', top: '22px', left: '15px', zIndex: 1000}}/>
                <SearchInput placeholder={'Поиск о арендодателям'}/>
            </Flex>

            <Flex width={'100%'}>
                <Grid marginTop={4} templateColumns="repeat(2, 1fr)" width={'100%'} gap={4}>
                    {rentList.list.map((r, num) => {
                        return <RentCard key={r.id} {...r} order={num}/>
                    })}
                </Grid>
            </Flex>
        </Stack>
    )
})
