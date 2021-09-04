import * as React from 'react'
import {observer} from "mobx-react";
import {
    Box,
    CircularProgress,
    Divider,
    Flex,
    Heading,
    Spacer,
    Spinner,
    Stack,
    Tag,
    TagLabel,
    Text
} from "@chakra-ui/react";
import {RentReceipts} from "./RentReceipts";
import {RentReceiptsHistory} from "./RentReceiptsHistory";
import {RentActionHistory} from "./RentActionHistory";
import {RentList} from "../../services/RentList";
import {useService} from "../../core/decorators/service";
import {ProfileService} from "../../services/ProfileService";

export const TenantView = observer(function TenantView(_props) {
    const rentList = useService(RentList)

    const profile = useService(ProfileService)

    React.useEffect(() => {
        rentList.getList()
    }, [])

    const rent = React.useMemo(() => {
        return rentList.list.find(r => r.tenantUUID === profile.info.companyId)
    }, [])

    const status = React.useMemo(() => {
        if (!rent) return;

        const text = (rent.status === 'NEW') && 'На рассмотрении'
        const statusName = 'pending'

        return {
            text,
            statusName
        }
    }, [rent])


    if (rentList.requestStatus === 'pending') {
        return (
            <Flex padding={8}>
                <Spinner size={'xl'}/>
            </Flex>
        )
    }


    return (
        <Stack width={'100%'} padding={8} spacing={'36px'}>
            <Flex>
                <Stack>
                    <Text>Терминал F, Этаж 2, Место F235</Text>

                    <Heading as={'h1'}>{rent.tenantName}</Heading>
                </Stack>

            </Flex>

            <Flex width={'100%'}>
                <Box bg={'#F5F4F2'} padding={4} flex={'1 0 48%'}>
                    <Flex>
                        <CircularProgress value={75} size={'160px'} color={'orange-bg'}/>
                        <Stack marginLeft={8}>
                            <Stack>
                                <Text fontWeight={500} fontSize={18}>Платеж до 12.09.2021</Text>
                                <Text fontWeight={700} fontSize={32} marginTop={0}>520 000 ₽</Text>
                            </Stack>
                            <Stack>
                                <Text fontWeight={500} fontSize={18}>Собрано</Text>
                                <Text fontWeight={700} fontSize={32} marginTop={0}>360 000 ₽</Text>
                            </Stack>
                        </Stack>
                    </Flex>
                </Box>

                <Spacer/>

                <Box bg={'#F5F4F2'} padding={4} flex={'1 0 48%'}>
                    <Flex>
                        <CircularProgress value={35} size={'160px'} color={'#FF0010'}/>
                        <Stack marginLeft={8}>
                            <Stack>
                                <Text fontWeight={500} fontSize={18}>Задолженность до 12.02.2019</Text>
                                <Text fontWeight={700} fontSize={32} marginTop={0}>120 000 ₽</Text>
                            </Stack>
                            <Stack>
                                <Text fontWeight={500} fontSize={18}>Собрано</Text>
                                <Text fontWeight={700} fontSize={32} marginTop={0}>32 000 ₽</Text>
                            </Stack>
                        </Stack>
                    </Flex>
                </Box>
            </Flex>


            <Stack flexBasis={'65%'} spacing="48px">
                <Heading as={'h2'} fontSize={32}>Данные о соглашении</Heading>

                <Flex>
                    <Stack flexBasis={'50%'}>
                        <Stack>
                            <Text color={'grey'} fontSize={15} fontWeight={500}>Срок действия договора аренды</Text>
                            <Text color={'black'} fontSize={18}
                                  fontWeight={500}>{rent.conditions.date} – {rent.conditions.endDate}</Text>
                        </Stack>

                        <Stack>
                            <Text color={'grey'} fontSize={15} fontWeight={500}>Ежемесячная стоимость аренды</Text>
                            <Text color={'black'} fontSize={18} fontWeight={500}>{rent.conditions.paymentAmount} ₽ /
                                мес.</Text>
                        </Stack>

                        <Stack>
                            <Text color={'grey'} fontSize={15} fontWeight={500}>Отчислений с выручки</Text>
                            <Text color={'black'} fontSize={18} fontWeight={500}>{rent.conditions.earningPercent}% /
                                день</Text>
                        </Stack>
                    </Stack>

                    <Stack spacing="24px">
                        <Stack>
                            <Text color={'grey'} fontSize={15} fontWeight={500}>Статус</Text>
                            <Tag variant={status.statusName}>
                                <TagLabel>{status.text}</TagLabel>
                            </Tag>
                        </Stack>
                        <Stack>
                            <Text color={'grey'} fontSize={15} fontWeight={500}>Дата платежа по аренде</Text>
                            <Text color={'black'} fontSize={18} fontWeight={500}>Каждое 15 число месяца</Text>
                        </Stack>
                    </Stack>
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
                <Heading as={'h2'} fontSize={32}>Транзакции</Heading>

                <RentReceipts {...rent}/>

                <Flex>
                    <RentReceiptsHistory {...rent}/>
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