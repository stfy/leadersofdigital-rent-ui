import * as React from 'react'
import {observer} from "mobx-react";
import {useHistory, useRouteMatch} from "react-router-dom";
import {chakra, Divider as BaseDivider, Flex, Heading, Link, Stack, Text} from "@chakra-ui/react";
import {RentReceipts} from "./RentReceipts";
import {RentReceiptsHistory} from "./RentReceiptsHistory";
import {RentActionHistory} from "./RentActionHistory";

const Divider = chakra(BaseDivider, {
    baseStyle: {
        height: '2px',
        width: '100%',
        bg: 'black',
        opacity: 1,
        position: 'relative',
        top: '4px'
    }
})

export const TenantLandlordView = observer(function TenantLandlordView(_props) {
    const match = useRouteMatch<{ id: string }>()

    const history = useHistory<{from : Location}>()

    const backLink = React.useMemo(() => {
        return history.location.state?.from?.pathname || '/renters';
    }, [])

    return (
        <Stack width={'100%'} padding={8} spacing={'36px'}>
            <Flex align={'center'}>
                <Link fontWeight={500} onClick={() => history.push(backLink)}>Назад</Link>
                <Divider marginLeft={4}/>
            </Flex>

            <Flex>
                <Stack>
                    <Text>Терминал F, Этаж 2, Место F235</Text>

                    <Heading as={'h1'}>Beluga Caviar Bar</Heading>
                </Stack>


                <Stack marginLeft={8} flexBasis={'65%'} spacing="48px">
                    <Heading as={'h2'} fontSize={32}>Данные о соглашении</Heading>

                    <Flex>
                        <Stack flexBasis={'50%'}>
                            <Stack>
                                <Text color={'grey'} fontSize={15} fontWeight={500}>Срок действия договора аренды</Text>
                                <Text color={'black'} fontSize={18} fontWeight={500}>12.02.2019 – 12.02.2022</Text>
                            </Stack>

                            <Stack>
                                <Text color={'grey'} fontSize={15} fontWeight={500}>Ежемесячная стоимость аренды</Text>
                                <Text color={'black'} fontSize={18} fontWeight={500}>520 000 ₽ / мес.</Text>
                            </Stack>

                            <Stack>
                                <Text color={'grey'} fontSize={15} fontWeight={500}>Отчислений с выручки</Text>
                                <Text color={'black'} fontSize={18} fontWeight={500}>1,5% / день</Text>
                            </Stack>
                        </Stack>

                        <Stack spacing="24px">
                            <Stack>
                                <Text color={'grey'} fontSize={15} fontWeight={500}>Статус</Text>
                                <Text color={'black'} fontSize={18} fontWeight={500}>Подтверждено</Text>
                            </Stack>
                            <Stack>
                                <Text color={'grey'} fontSize={15} fontWeight={500}>Дата платежа по аренде</Text>
                                <Text color={'black'} fontSize={18} fontWeight={500}>Каждое 15 число месяца</Text>
                            </Stack>
                        </Stack>
                    </Flex>
                </Stack>


            </Flex>

            <Divider/>

            <Stack spacing={'24px'}>
                <Heading as={'h2'} fontSize={32}>Транзакции</Heading>

                <RentReceipts/>

                <Flex>
                    <RentReceiptsHistory/>
                </Flex>
            </Stack>

            <Divider/>

            <Stack spacing={'24px'}>
                <Heading as={'h2'} fontSize={32}>Кредитование</Heading>

                <Flex>
                    <Stack flexBasis={'50%'}>
                        <Stack>
                            <Text color={'grey'} fontSize={15} fontWeight={500}>Кредитный лимит</Text>
                            <Text color={'black'} fontSize={18} fontWeight={500}>520 000 ₽</Text>
                        </Stack>

                        <Stack>
                            <Text color={'grey'} fontSize={15} fontWeight={500}>Отчислений с выручки в счет погашения
                                займа</Text>
                            <Text color={'black'} fontSize={18} fontWeight={500}>1,5%</Text>
                        </Stack>
                    </Stack>


                    <Stack>
                        <Stack>
                            <Text color={'grey'} fontSize={15} fontWeight={500}>Процентная ставка по кредиту </Text>
                            <Text color={'black'} fontSize={18} fontWeight={500}>7,5%</Text>
                        </Stack>

                        <Stack>
                            <Text color={'grey'} fontSize={15} fontWeight={500}>Прогнозируемый размер
                                задолженности </Text>
                            <Text color={'black'} fontSize={18} fontWeight={500}>320 000 ₽</Text>
                        </Stack>
                    </Stack>
                </Flex>

            </Stack>

            <Divider/>

            <Stack spacing={'24px'}>
                <Heading as={'h2'} fontSize={32}>Действия и комментарии</Heading>

                <RentActionHistory/>
            </Stack>
        </Stack>
    );
})