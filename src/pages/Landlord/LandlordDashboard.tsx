import * as React from 'react';
import {observer} from "mobx-react";
import {
    chakra,
    Flex,
    Grid,
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
    Text
} from "@chakra-ui/react";
import {useHistory} from "react-router-dom";
import {Input} from "../../ui/TextInput";
import {SearchIcon} from "@chakra-ui/icons";
import {useService} from "../../core/decorators/service";
import {IRent, RentList} from "../../services/RentList";


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

function RentCard(props: IRent & { order: number }) {
    const history = useHistory();

    function handleClick() {
        history.push(`/renters/${props.id}`, {
            from: history.location
        });
    }

    const order = React.useMemo(() => {

        return 100 + props.order;
    }, [])

    const status = React.useMemo(() => {
        const text = (props.status === 'NEW') && 'На рассмотрении'
        const statusName = 'pending'

        return {
            text,
            statusName
        }
    }, [])

    return (
        <Stack
            as={Flex}
            grow={1}
            shrink={0}
            border={'1px solid black'}
            height={'285px'}
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

            <Tag position={'absolute'} top={4} right={4} variant={status.statusName}>
                <TagLabel>{status.text}</TagLabel>
            </Tag>

            <Stack padding={4}>
                <Text fontWeight={'500'} fontSize={18} maxW={'150px'}>Терминал F, Этаж 2, Место F{order}</Text>
                <Link as={Text} fontWeight={'700'} fontSize={32}>{props.tenantName}</Link>
                <Text>{props.conditions.date} - {props.conditions.endDate}</Text>
            </Stack>

            <Stack width={'100%'} padding={4}>
                <Text>Арендная плата за месяц</Text>

                <Progress value={(props.totalEarnings / props.conditions.paymentAmount) * 100} colorScheme={'orange'}
                          height={1}/>

                <Flex justify={'space-between'}>
                    <Text>{props.totalEarnings} ₽</Text>
                    <Text>{props.conditions.paymentAmount} ₽</Text>
                </Flex>
            </Stack>

        </Stack>
    )
}