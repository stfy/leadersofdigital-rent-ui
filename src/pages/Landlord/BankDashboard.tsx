import * as React from 'react';
import {observer} from "mobx-react";
import {Flex, Grid, Heading, Stack} from "@chakra-ui/react";
import {useService} from "../../core/decorators/service";
import {RentList} from "../../services/RentList";
import {RentCard} from "../../components/RentCard";

export const BankDashboard = observer(function LandlordDashboard() {
    const rentList = useService(RentList);

    React.useEffect(() => {
        rentList.getList()
    }, [])
    
    return (
        <Stack as={Flex} width={'100%'} padding={10}>
            <Heading as="h1" size="xl" textAlign={'left'}>Кредитуемых: {rentList.list.length || 0}</Heading>

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
