import * as React from 'react';
import {observer} from "mobx-react";
import {Box, Flex, Heading, Spacer, Stack, Text} from "@chakra-ui/react";
import {IRent} from "../../services/RentList";
import {Button} from "../../ui/Button";
import {useService} from "../../core/decorators/service";
import {ConditionsService} from "../../services/ConditionsService";

export const AcceptConditions: React.FC<IRent> = observer(function AcceptConditions(rent) {
    const condService = useService(ConditionsService)

    function submitHandler() {
        condService.acceptConditions(rent.id, {});
    }

    return (
        <Box bg={`#F2F1F0`} padding={4}>
            <Flex>
                <Stack grow={1} flexBasis={'30%'}>
                    <Heading as={'h2'} fontSize={32}>Новые условия соглашения</Heading>

                </Stack>


                <Stack>
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
                        <Text color={'grey'} fontSize={15} fontWeight={500}>Конфессионный коэффициент</Text>
                        <Text color={'black'} fontSize={18}
                              fontWeight={500}>{rent.conditions.concessionPercent}%</Text>
                    </Stack>

                    <Flex width={'100%'} height={'24px'}/>

                    <Flex>
                        <Button color={'white'} onClick={submitHandler}>Подтвердить</Button>
                        <Spacer/>
                        <Button color={'white'} bgColor={'red.500'}>Отклонить</Button>
                    </Flex>
                </Stack>
            </Flex>
        </Box>
    )
})