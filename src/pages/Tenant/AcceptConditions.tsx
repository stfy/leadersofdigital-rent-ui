import * as React from 'react';
import {observer} from "mobx-react";
import {Box, Flex, Heading, Spacer, Spinner, Stack, Text} from "@chakra-ui/react";
import {IRent, RentList} from "../../services/RentList";
import {Button} from "../../ui/Button";
import {useService} from "../../core/decorators/service";
import {ConditionsService} from "../../services/ConditionsService";
import {useTransaction} from "../../hooks/tx";

export const AcceptConditions: React.FC<IRent> = observer(function AcceptConditions(rent) {
    const condService = useService(ConditionsService)
    const rentList = useService(RentList)

    const tx = useTransaction(() => {
        return condService.acceptConditions()
    }, {
        onDone: () => {
            rentList.updateList()
        }
    })

    function submitHandler() {
        tx.process(rent.id, {})
    }


    return (
        <Box bg={`#F2F1F0`} padding={4}>
            <Flex>
                <Stack grow={1} flexBasis={'30%'}>
                    <Heading as={'h2'} fontSize={32}>Новые условия соглашения</Heading>

                </Stack>

                <Stack spacing={'24px'}>
                    <Stack spacing={'24px'}>
                        <Heading as={'h2'} fontSize={22}>Параметры кредитования</Heading>

                        <Flex>
                            <Stack flexBasis={'50%'}>
                                <Stack>
                                    <Text color={'grey'} fontSize={15} fontWeight={500}>Кредитный лимит</Text>
                                    <Text color={'black'} fontSize={18} fontWeight={500}>{rent.conditions.limit} ₽</Text>
                                </Stack>

                                <Stack>
                                    <Text color={'grey'} fontSize={15} fontWeight={500}>Отчислений с выручки в счет погашения
                                        займа</Text>
                                    <Text color={'black'} fontSize={18}
                                          fontWeight={500}>{rent.conditions.earningCreditPercent} %</Text>
                                </Stack>
                            </Stack>


                            <Stack>
                                <Stack>
                                    <Text color={'grey'} fontSize={15} fontWeight={500}>Процентная ставка по кредиту </Text>
                                    <Text color={'black'} fontSize={18} fontWeight={500}>{rent.conditions.interestRate} %</Text>
                                </Stack>

                                <Stack>
                                    <Text color={'grey'} fontSize={15} fontWeight={500}>Прогнозируемый размер
                                        задолженности </Text>
                                    <Text color={'black'} fontSize={18} fontWeight={500}>320 000 ₽</Text>
                                </Stack>
                            </Stack>
                        </Flex>
                    </Stack>

                    <Stack spacing={'24px'}>
                        <Heading as={'h2'} fontSize={22}>Параметры аренды</Heading>



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
                                    <Text color={'grey'} fontSize={15} fontWeight={500}>Дата платежа по аренде</Text>
                                    <Text color={'black'} fontSize={18} fontWeight={500}>Каждое 15 число месяца</Text>
                                </Stack>
                            </Stack>

                            <Stack>

                                <Stack>
                                    <Text color={'grey'} fontSize={15} fontWeight={500}>Отчислений с выручки</Text>
                                    <Text color={'black'} fontSize={18} fontWeight={500}>{rent.conditions.earningPercent}% /
                                        день</Text>
                                </Stack>

                                <Stack>
                                    <Text color={'grey'} fontSize={15} fontWeight={500}>Минимально гарантированный
                                        платеж</Text>
                                    <Text color={'black'} fontSize={18}
                                          fontWeight={500}>{rent.conditions.minGuaranteedConcession} ₽</Text>
                                </Stack>

                                <Stack>
                                    <Text color={'grey'} fontSize={15} fontWeight={500}>Концессионный коэффициент</Text>
                                    <Text color={'black'} fontSize={18}
                                          fontWeight={500}>{rent.conditions.concessionPercent}%</Text>
                                </Stack>
                            </Stack>

                        </Flex>
                    </Stack>


                    <Flex>
                        {(tx.requestStatus === 'pending') && (<Spinner/>)}
                        {(tx.requestStatus !== 'pending') && (
                            <Button color={'white'} onClick={submitHandler}>Подтвердить</Button>)}

                        <Spacer/>

                        {/*<Button color={'white'} bgColor={'red.500'}>Отклонить</Button>*/}
                    </Flex>
                </Stack>
            </Flex>
        </Box>
    )
})