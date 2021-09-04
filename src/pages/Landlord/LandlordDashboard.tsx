import * as React from 'react';
import {observer} from "mobx-react";
import {chakra, Flex, Grid, Heading, Stack, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import {Input} from "../../ui/TextInput";
import {SearchIcon} from "@chakra-ui/icons";
import {useService} from "../../core/decorators/service";
import {RentList} from "../../services/RentList";
import {RentCard} from "../../components/RentCard";


const SearchInput = chakra(Input, {
    baseStyle: {
        paddingInlineStart: '45px',
        border: 0
    }
})

export const LandlordDashboard = observer(function LandlordDashboard() {
    const rentList = useService(RentList);

    React.useEffect(() => {
        rentList.getList()

    }, [])

    const list = (
        <Flex width={'100%'} grow={1} shrink={0}>
            <Grid marginTop={4} templateColumns="repeat(2, 1fr)" width={'100%'} gap={4}>
                {rentList.list.map((r, num) => {
                    return <RentCard key={r.id} {...r} order={num}/>
                })}
            </Grid>
        </Flex>
    )

    return (
        <Stack as={Flex} width={'100%'} padding={10} spacing={'24px'}>
            <Heading as="h1" size="xl" textAlign={'left'}>Арендаторов: {rentList.list.length || 0}</Heading>

            <Tabs variant="rentersList" colorScheme="green">
                <TabList>
                    <Tab>Списком</Tab>
                    <Tab>На карте</Tab>
                </TabList>

                <Flex position={'relative'} marginTop={4} marginBottom={4}>
                    <SearchIcon __css={{position: 'absolute', top: '22px', left: '15px', zIndex: 1000}}/>
                    <SearchInput placeholder={'Поиск о арендодателям'}/>
                </Flex>

                <TabPanels p={0}>
                    <TabPanel>{list}</TabPanel>
                    <TabPanel>TODO: Вклинить мапу</TabPanel>
                </TabPanels>
            </Tabs>

        </Stack>
    )
})
