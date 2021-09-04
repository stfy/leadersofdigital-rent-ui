import * as React from 'react';
import {Flex, Link, Progress, Stack, Tag, TagLabel, Text} from "@chakra-ui/react";
import {useHistory} from "react-router-dom";
import {IRent} from "../services/RentList";
import {useRentStatus} from "../hooks/status";


export function RentCard(props: IRent & { order: number }) {
    const history = useHistory();

    function handleClick() {
        history.push(`/renters/${props.id}`, {
            from: history.location
        });
    }

    const order = React.useMemo(() => {

        return 100 + props.order;
    }, [])

    const status = useRentStatus(props);

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

                <Progress value={(props.totalEarnings / props.conditions.paymentAmount) * 100} variant={'black'}
                          colorScheme={'orange'}
                          height={1}/>

                <Flex justify={'space-between'}>
                    <Text>{props.totalEarnings} ₽</Text>
                    <Text>{props.conditions.paymentAmount} ₽</Text>
                </Flex>
            </Stack>
        </Stack>
    )
}