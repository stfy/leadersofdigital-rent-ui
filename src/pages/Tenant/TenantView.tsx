import * as React from 'react'
import {observer} from "mobx-react";
import {Box, CircularProgress, Divider, Flex, Heading, Spacer, Stack, Text} from "@chakra-ui/react";
import {RentReceipts} from "./RentReceipts";
import {RentReceiptsHistory} from "./RentReceiptsHistory";
import {RentActionHistory} from "./RentActionHistory";

export const TenantView = observer(function TenantView(_props) {
    return (
        <Stack width={'100%'} padding={8} spacing={'36px'}>
            <Flex>
                <Stack>
                    <Text>Терминал F, Этаж 2, Место F235</Text>

                    <Heading as={'h1'}>Beluga Caviar Bar</Heading>
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

                <RentReceipts/>

                <Flex>
                    <RentReceiptsHistory/>
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