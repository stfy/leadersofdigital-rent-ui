import * as React from 'react';
import {observer} from "mobx-react";
import {
    chakra,
    Flex, Grid,
    Heading,
    Link,
    Progress,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tag,
    TagLabel,
    Text,
    Wrap
} from "@chakra-ui/react";
import {useHistory} from "react-router-dom";
import {Input} from "../../ui/TextInput";
import {SearchIcon} from "@chakra-ui/icons";


const SearchInput = chakra(Input, {
    baseStyle: {
        paddingInlineStart: '45px',
        border: 0
    }

})

export const LandlordDashboard = observer(function LandlordDashboard() {
    const list = (
        <Flex width={'100%'} grow={1} shrink={0}>
            <Grid marginTop={4} templateColumns="repeat(2, 1fr)" width={'100%'} gap={4}>
                <RentCard/>
                <RentCard/>
                <RentCard/>
                <RentCard/>
            </Grid>
        </Flex>
    )

    return (
        <Stack as={Flex} width={'100%'} padding={10} spacing={'24px'}>
            <Heading as="h1" size="xl" textAlign={'left'}>Арендаторов: 240</Heading>

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

function RentCard() {
    const history = useHistory();

    function handleClick() {
        history.push('/renters/xsaf', {
            from: history.location
        });
    }

    return (
        <Stack
            as={Flex}
            grow={1}
            shrink={0}
            border={'1px solid black'}
            height={'265px'}
            bgColor={'white'}
            position={'relative'}
            cursor={'pointer'}
            onClick={handleClick}

            _hover={
                {
                    boxShadow: `3px 3px black`,
                    transition: 'all .2s ease-out'
                }
            }
        >

            <Tag position={'absolute'} top={4} right={4} variant="confirmed">
                <TagLabel>Подтверждено</TagLabel>
            </Tag>

            <Stack padding={4}>
                <Text fontWeight={'500'} fontSize={18}>Терминал F, Этаж 2, Место F235</Text>
                <Link as={Text} fontWeight={'700'} fontSize={32}>ARENDATOR</Link>
                <Text>520 р/мес. Осталось 8 мес.</Text>
            </Stack>

            <Stack width={'100%'} padding={4}>
                <Text>Арендная плата за месяц</Text>

                <Progress value={80} colorScheme={'orange'} height={1}/>

                <Flex justify={'space-between'}>
                    <Text>362 534 ₽</Text>
                    <Text>520 000 ₽</Text>
                </Flex>
            </Stack>

        </Stack>
    )
}